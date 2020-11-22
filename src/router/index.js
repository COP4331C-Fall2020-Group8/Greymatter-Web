import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import SetViewer from '../views/SetViewer.vue'

const { store } = require('../stores')

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup
    // meta: { requiresLogin: true }
  },
  {
    path: '/login',
    name: 'login',
    // alias: ['/', '/home'],
    alias: ['/'],
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/home/set/:setID',
    name: 'setviewer',
    props: true,
    component: SetViewer
  }
  //,
  // {
    // path: '/cardviewer',
    // name: 'cardviewer',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // component: CardViewer
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.user.isLoggedIn) {
    // You can use store variable here to access globalError or commit mutation
    next('/login')
  } else if (store.state.user.isLoggedIn && (to.name === 'login' || to.name === 'signup')) {
    next('/home')
  } else {
    next()
  }
})

export default router
