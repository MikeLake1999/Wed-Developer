const { default: nextExport } = require('next/dist/server/export')
const { default: build } = require('next/dist/server/build')
const path = require('path')

module.exports = async (dir) => {
  const inpressPath = path.resolve(dir, '.inpress')

  await build(inpressPath)
  await nextExport(
    inpressPath,
    { outdir: path.resolve(inpressPath, 'dist')},
  )
}
