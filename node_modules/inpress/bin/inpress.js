const program = require('commander')
const path = require('path')

const { dev, build } = require('../lib')

program
  .command('dev <dir>')
  .action((dir) => {
    dev(path.resolve(dir))
  })

program
  .command('build <dir>')
  .action((dir) => {
    build(path.resolve(dir))
  })

program.parse(process.argv)
