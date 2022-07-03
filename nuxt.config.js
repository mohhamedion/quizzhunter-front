import colors from 'vuetify/es5/util/colors'

export default {
   // serverMiddleware: ["redirect-ssl"],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - quizzhunter',
    title: 'quizzhunter',
    htmlAttrs: {
      lang: 'ar'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ],
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'data-ad-client': 'ca-pub-2029123904217360',
        async: true
      }
    ]
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/TiptapVuetify'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['nuxt-highlightjs', {
      style: 'sunburst'
    }]
  ],


  endpoint:'http://localhost',
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  loading: '~/components/loading.vue',
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
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

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: ''
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: '',
          // autoFetch: true
        },

        endpoints: {
          login: {url: 'https://quizzhunter-api.tavakal.com/api/login', method: 'post'},
          logout: {url: 'https://quizzhunter-api.tavakal.com/api/logout', method: 'post'},
          user: {url: 'https://quizzhunter-api.tavakal.com/api/user', method: 'get'}
        }
      }
    }
  },


  env: {
    baseUrl: process.env.BASE_URL || 'https://quizzhunter-api.tavakal.com'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vuetify/lib', "tiptap-vuetify"]
  }
}
