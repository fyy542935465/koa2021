// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import api from  './config/api'
import http from './util'
import ENV from '../../env'
import CONFIG from './config'
console.log(CONFIG)
const CURRENT = CONFIG[ENV.CURRENT]
Vue.prototype.api = api 
Vue.prototype.$http = http 
Vue.prototype.$globalImg = CURRENT.globalImg 
Vue.use(VueParticles)
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
