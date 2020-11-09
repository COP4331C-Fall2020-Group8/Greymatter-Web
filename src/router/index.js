import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const { store } = require('../stores')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresLogin) && !store.state.user.isLoggedIn) {
//     // You can use store variable here to access globalError or commit mutation
//     next('/login')
//   } else if (store.state.user.isLoggedIn && (to.name === 'login' || to.name === 'signup')) {
//     next('/contacts')
//   } else {
//     next()
//   }
// })

export default router
