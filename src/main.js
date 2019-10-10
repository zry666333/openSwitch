// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './utils/pml-msgBox.js'
import store from './store/vuex.js'
import Http from './service/http'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 把Http挂载到Vue实例上
Vue.prototype.$Http = Http

let bus = new Vue()
Vue.prototype.bus = bus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
