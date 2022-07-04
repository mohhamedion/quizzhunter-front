import Vue from 'vue'


export default ({app}) => {
  let i18n = app.i18n

  Vue.prototype.$languageHelper = {
    siteIsRtl() {
      return i18n.locale === 'ar';
    },
    isRtl(string) {
      let english = /^[A-Za-z0-9]*$/;
      return english.test(string);
    },
    textClass(){
      return this.siteIsRtl() ? 'text-right' : 'text-left'
    }
  }
}

// const plugin = {
//   install() {
//     Vue.languageHelper = helpers
//     Vue.prototype.$languageHelper = helpers
//   }
//
// }
//
// Vue.use(plugin)
