const images = require('remark-images')
const path = require('path')

module.exports = {
  pagesExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            mdPlugins: [images]
          }
        }
      ]
    })

    return config
  }
}
