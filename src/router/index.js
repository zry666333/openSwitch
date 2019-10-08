import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import '../css/reset.scss'
import Home2 from '@/components/home-2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home2',
      component: Home2
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
