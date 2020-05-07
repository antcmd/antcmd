const path = require('path')

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

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    })

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      loader: 'url-loader',
      options: {
        limit: false,
      },
    })

    return config
  },
}
