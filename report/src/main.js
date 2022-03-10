import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import requests from './requests.js'
import App from './App.vue'
import router from './router.js'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.prototype.request = requests
Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')