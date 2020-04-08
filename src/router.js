import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BemScheme',
      component: () => import('./pages/BemScheme.vue')
    },
    {
      path: '/404',
      name: 'Error404',
      component: () => import('./pages/404.vue')
    },
    {
      path: '*',
      redirect: { name: 'Error404' }
    }
  ]
})
