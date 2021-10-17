const path = require('path')
const execa = require('execa')
const ora = require('ora')
const download = require('download-git-repo')

const { getTemplates } = require('./list')
const log = require('../utils/loggers')

function downloadRepo(url, projectName) {
  // console.log('url, projectName', url, projectName)

  // todo 不用每次实例化
  const spinner = ora('模板下载中...')
  spinner.start()
  return new Promise((resolve) => {
    download(
      // todo 如果是私域工程，可能无法下载。此时需要凭证，参考 https://www.npmjs.com/package/download-git-repo
      url, // 直接下载zip包
      projectName,
      (err) => {
        spinner.stop()
        if (err) {
          log.error('模板下载失败，请重试')
          resolve(false)
          return
        }
        log.done('模板下载成功')
        resolve(true)
      }
    )
  })
}

async function getDownloadUrl(targetTemplate) {
  const list = await getTemplates()
  const matchedItem = list.find((item) => item.name === targetTemplate)
  return matchedItem.downloadUrl
}

function runCommand(command, projectDir) {
  console.log('runCommand', command, projectDir, process.cwd())
  return execa.command(command, { cwd: projectDir })
}

async function installPkgs(projectName) {
  const context = process.cwd() // 用户执行程序的目录
  const projectDir = path.resolve(context, projectName) // 用户即将初始化的工程目录

  const run = (command) => runCommand(command, projectDir)
  const spinner = ora('安装依赖中...')
  spinner.start()

  try {
    await run(`cd ${projectDir}`)
    await run('git init')
    await run('npm install')
    log.done('安装依赖成功')
    // todo 提醒cd <app-name> 运行
  } catch (e) {
    console.log('err', e)
    log.done('安装依赖失败')
  } finally {
    spinner.stop()
  }
}

/**
 *
 * @param {String} projectName projectName
 * @param {Object} options
 * @param {Object} options.template 模板名称
 */
async function create(projectName, options) {
  // console.log('create', projectName, options)

  const downloadUrl = await getDownloadUrl(options.template)

  const isDownloadSuccess = await downloadRepo(downloadUrl, projectName)
  if (!isDownloadSuccess) return

  installPkgs(projectName)
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    console.log(err)
    // stopSpinner()
    process.exit(1)
  })
}
