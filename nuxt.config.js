import colors from 'vuetify/es5/util/colors'
// import bodyParser from 'body-parser'
require('dotenv').config()

export default {
  ssr: false,
  loading: false,
  telemetry: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
  ],

  i18n: {
    seo: true,
    locales: [
      { code: 'tr', iso: 'tr-TR', file: 'tr-TR.js' },
      { code: 'en', iso: 'en-US', file: 'en-US.js' },
      { code: 'ru', iso: 'ru-RU', file: 'ru-RU.js' },
      { code: 'es', iso: 'es-ES', file: 'es-ES.js' },
      { code: 'ar', iso: 'ar-SA', file: 'ar-SA.js', dir: 'rtl' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      onlyOnRoot: true, // recommended
    },
    langDir: 'lang/',
    lazy: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // treeShake: true, Default: process.env.NODE_ENV === 'production'
    defaultAssets: {
      font: {
        family: 'Roboto',
      },
      icons: false,
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#0072bc',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#4db848',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extractCSS: true,
  },
}
