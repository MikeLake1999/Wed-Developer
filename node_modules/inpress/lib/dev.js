const next = require('next')
const { createServer } = require('http')
const { parse } = require('url')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const ensureDir = require('ensure-dir')

const nextConfig = require('../next.config')
const { getPageEntryTpl } = require('./util')

const readdirAsync = promisify(fs.readdir)
const writeFileAsync = promisify(fs.writeFile)

module.exports = async (dir) => {
  const filenames = await readdirAsync(dir)
  const mdFilenames = filenames.filter(n => path.extname(n) === '.md')
  if (Array.isArray(mdFilenames) && mdFilenames.length) {
    const inpressPath = path.join(dir, '.inpress')
    const pagesPath = path.join(inpressPath, 'pages');

    await ensureDir(pagesPath);

    for (const mdFilename of mdFilenames) {
      const mdBasename = path.basename(mdFilename, '.md')
      const content = getPageEntryTpl(mdBasename)

      await writeFileAsync(path.join(pagesPath, mdBasename + '.js'), content.trim(), 'utf-8')
    }
  }

  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev, ...nextConfig, dir: path.join(dir, '.inpress') })
  const handle = app.getRequestHandler()

  await app.prepare()

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}
