const ora = require('ora')
const Table = require('cli-table3')

const { log, info, done, error, clearConsole } = require('../utils/loggers')

async function getTemplates() {
  const spinner = ora('模板类别查询中...')
  spinner.start()
  const list = [
    // todo 远端拉取
    {
      name: 'h5',
      description: 'h5 项目的模板，技术栈为 vue2+vuex+ts+less',
      downloadUrl:
        'direct:' +
        'https://github.com/dwfrost/vue2-ts-vuex-demo/archive/master.zip',
      gitUrl: 'https://github.com/dwfrost/vue2-ts-vuex-demo.git',
    },
  ]
  return new Promise((resolve) => {
    setTimeout(() => {
      spinner.stop()
      resolve(list)
    }, 1000)
  })
}

function logTemplates(list) {
  const table = new Table({
    head: ['模板名称', '描述', 'git地址'],
    style: {
      head: ['cyan'],
    },
  })

  if (list.length) {
    list.forEach((item) => {
      // table.push([item.name, item.description, item.gitUrl])
      table.push([
        'test',
        '这是一个很有趣的项目',
        'https://github.com/test.git',
      ])
    })
    info('模板列表: ')
    console.log(`\n${table.toString()}\n`)
  } else {
    error('拉取模板失败，请联系脚手架开发人员,@frost,@ruby,@ljy')
  }
}

exports.getTemplates = getTemplates

exports.logList = async function () {
  const list = await getTemplates()
  logTemplates(list)
}
