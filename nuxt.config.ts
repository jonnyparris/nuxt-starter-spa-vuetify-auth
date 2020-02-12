import colors from 'vuetify/es5/util/colors';
import webpack from 'webpack';

const baseUrl = process.env.API_BASE_URL || '/';
const appTitle = process.env.APP_TITLE || process.env.npm_package_name || 'PROJECT TITLE';
const appDesciption = process.env.APP_DESCRIPTION || process.env.npm_package_description || '';
const supportedLocales = [
  {
    code: 'en',
    file: 'en.json'
  }
];
export const supportedDateLocales = ['enGB'];

export default {
  env: {
    APP_TITLE: appTitle,
    GIT_TAG: process.env.GIT_TAG,
    GIT_REV: process.env.GIT_REV,
    VERSION: process.env.VERSION,
    SITEKEY: process.env.SITEKEY,
    BUILD_DATE: process.env.BUILD_DATE
  },
  head: {
    title: appTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: appDesciption
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js' },
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver' }
    ]
  },
  plugins: [
    '~/plugins/axios',
    ...(process.env.NODE_ENV !== 'production' ? ['~/plugins/mirage/mirage'] : [])
  ],
  loading: { color: '#fff' },
  css: ['~/assets/css/main.css'],
  build: {
    extend(config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (!ctx.isDev) {
        config.output.publicPath = './_nuxt/';
      }
      return config;
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /date-fns[/\\]/,
        new RegExp(`[/\\\\](${supportedDateLocales.join('|')})[/\\\\]`)
      )
    ]
  },
  router: {
    base: baseUrl,
    middleware: ['auth']
  },
  mode: 'spa',
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  modules: ['nuxt-i18n', '@nuxtjs/axios', '@nuxtjs/auth'],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  i18n: {
    locales: supportedLocales,
    detectBrowserLanguage: false,
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    seo: false,
    parsePages: false,
    baseUrl,
    pages: {}
  },
  axios: {
    progress: false,
    baseURL: baseUrl
  },
  auth: {
    redirect: {
      login: 'login',
      logout: '/',
      callback: false,
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: false
        }
      }
    },
    plugins: ['~/plugins/auth']
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
};
