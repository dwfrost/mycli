// const ora = require('ora')
const download = require('download-git-repo')
// import ora from 'ora'
// import download from 'download-git-repo'
async function run() {
  // const spinner = ora('模板下载中...')
  // spinner.start()
  console.log('start')

  function downloadRepo() {
    return new Promise((resolve) => {
      download(
        'direct:https://github.com/dwfrost/vue2-ts-vuex-demo/archive/master.zip',
        'template',
        (err) => {
          if (err) {
            console.log('download error', err)
            resolve(false)
            return
          }
          console.log('down success')
          resolve(true)
        }
      )
    })
  }

  await downloadRepo()
  console.log('end')
}
run()
// console.log('ora', ora)
