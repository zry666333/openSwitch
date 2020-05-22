import Vue from 'vue'
import Router from 'vue-router'
import '../css/reset.scss'
import '../css/theme.scss'
import Home from '@/components/home'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
