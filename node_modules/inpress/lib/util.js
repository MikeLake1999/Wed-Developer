function getPageEntryTpl(basename) {
  return `
import React from 'react'
import ${basename} from '../../${basename}.md'

export default () => React.createElement(${basename})
  `.trim()
}

module.exports = {
  getPageEntryTpl
}
