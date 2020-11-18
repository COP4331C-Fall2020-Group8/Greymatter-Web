import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import { store } from './stores'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vuetify from './plugins/vuetify';

// import axios from 'axios'
// axios.defaults.baseURL = 'https://grey-matter-backend.herokuapp.com/api'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
