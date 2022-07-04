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
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    ['nuxt-highlightjs', {
      style: 'sunburst'
    }]
  ],


  i18n: {
    locales: [{
      code: 'en', domain: '/en', isRtl: false
    }, {
      code: 'ar', domain: '/ar', isRtl: true
    }],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          test: {
            author: 'Author',
            comment:'Comment',
            questions: 'Questions',
            seconds: 'Seconds',
            testNow: 'Test Now',
            ContinuePreviousTest: 'Continue Previous Test',
            bestForMonth: 'Best for this month',
            lastTesters: 'Last testers',
            comments: 'Comments'
          },
          auth: {
            login: 'Login',
            logout: 'Logout',
            register: 'Register',
            createNewAccount: 'Create new account',
            youAgreeWithTerms: 'By creating an account, you agree to our',
            terms: 'terms',
            and: 'and',
            privacy: "privacy policy"
          },
          test_your_skills: 'Test your skills with your favorite programing language',
          best_way_to_test_skills: 'Best way to test your skills 😁',
          tests: 'Tests',
          what_is_quizz_hunter: 'What is QuizzHunter?',
          for_whom_is_quizz_hunter: 'For who is Quizzhunter?',
          info: [
            '',
            ' ',
            '',
            '',
          ],
          start_from_where: 'Start from here',
          call_us: 'Call us',
          testsPage: {
            notFound:'Not found',

            clearFilter: 'Clear filter',

            category: {
              text: 'Category',
              choose: 'Choose category'
            },
            level: {
              text: 'Level',
              choose: 'Choose Level'
            }
          }
        },
        ar: {
          test: {
            author: 'الكاتب',
            comment:'علق',
            questions: 'أسالة',
            seconds: 'ثوامي',
            testNow: 'أختبر الان',
            ContinuePreviousTest: 'أكمال الاختبار السابق',
            bestForMonth: 'الافضل اخر 30 يوم',
            lastTesters: 'اخر المختبرين',
            comments: 'التعليقات'

          },
          auth: {
            login: 'تسجيل دخول',
            logout: 'تسجيل خروج',
            register: 'سجل حساب',
            createNewAccount: 'تسجيل حساب جديد',
            youAgreeWithTerms: 'عند تسجيلك الحساب, فأنك توافق على',
            terms: 'شروط الاستخدام',
            and: 'و',
            privacy: "الخصوصية"
          },
          test_your_skills: 'أختبر نفسك في مجالك وأبحث عن عمل',
          best_way_to_test_skills: '😁 افضل طريقة لتختبر نفسك في مجال عملك\n',
          tests: 'الاختبارات',
          what_is_quizz_hunter: 'ماهو الـ QuizzHunter؟\n',
          for_whom_is_quizz_hunter: 'لمن موجه الـ QuizzHunter ؟\n',
          info: [
            'يتم وضع الاختبارات من قبل اشخاص ذو خبرة, والشركات الباحثة عن موظفين.\n',
            '              هي منصة الكترونية تستطيع من خلالها اجتياز اختبارات في جميع لغات البرمجة.\n',
            'موجه للشركات البرمجية الباحثة عن موظفين, يقدم QuizzHunter بيانات الاختبارات للشركات, لسهولة انتقاء الموظفين.',
            'موجه للمستجدين الباحثين عن عمل, يساعدك QuizzHunter على الاستعداد لمقابلات العمل.',
          ],
          start_from_where: 'ابدأ من هنا.\n',
          call_us: 'أتصل بنا',
          testsPage: {
            notFound:'ﻻ يوجد نتائج',
            clearFilter: 'نتظيف الفلتر',
            category: {
              text: 'المجال',
              choose: 'اختر المجال'
            },
            level: {
              text: 'درجة الصعوبة',
              choose: 'اختر درحة الصعوبة'
            }
          }
        }
      }
    }
  }
  ,
  endpoint: 'http://localhost',
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
