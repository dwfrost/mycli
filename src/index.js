const program = require('commander');
const minimist = require('minimist');
const chalk = require('chalk');

const pkg = require('../package.json');
const create = require('./lib/create');
const { logList } = require('./lib/list');

program
  .version(`mycli ${pkg.version}`)
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .description('创建新工程')
  .option('-t, --template <templateName>', '跳过对话框，直接使用远端模板')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          "\n Info: You provided more than one argument. The first one will be used as the app's name, the rest are ignored.",
        ),
      );
    }
    create(name, options);
  });

program
  .command('list')
  .description('查看模板列表')
  .alias('ls')
  .action(() => {
    logList();
  });

program.parse(process.argv);
