import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import '../css/reset.scss'
import '../css/global.scss'
import Home2 from '@/components/home-2'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
