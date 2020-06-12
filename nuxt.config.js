import bodyParser from 'body-parser'

export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || 'antcmd.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/logo/web/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/css/main.sass',
    '@/css/pages.scss',
    '@/css/suggestions.sass',
    '@/css/typography',
    '@/css/themes.scss'
  ],
  plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/dotenv'],
  axios: {},
  build: {
    extend(config, ctx) {}
  },
  // buildDir: '.dist',
  serverMiddleware: [
    bodyParser.json(),
    {
      path: '/api',
      handler: '~/api/index.js'
    }
  ],
  pwa: {
    icon: {
      iconSrc: '/favicon.png'
    }
  }
}
