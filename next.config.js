const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack(config) {
    config.resolve.modules.push(path.resolve('./'))

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    })

    return config
  },
}
