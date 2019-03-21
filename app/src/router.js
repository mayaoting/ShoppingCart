import Vue from 'vue'
import Router from 'vue-router'

import cart from './views/cart'
import detail from './views/detail'
import counter from './views/counter'
import NotFound from './views/404'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/cart' },
    { path: '/cart', name: 'cart', component: cart },
    { path: '/products/:id', name: 'detail', component: detail },
    { path: '/counter', name: 'counter', component: counter },
    { path: '*', name: 'NotFound', component: NotFound },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      },
    },
  ],
})

export const createRouter = () => router
export default router
