import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)
// const path = process.env.NODE_ENV === 'production' ? 'vue-cli/' : '/'

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: process.env.VUE_APP_ROUTE_PATH,
  routes: [{
      name: '',
      path: '/',
      component: Index,
    },
    {
      path: '/index',
      name: 'investTarget',
      component: () => import('./views/plan/Returnsys.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
