import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user_log_id: -1,
    isLoggedIn: false
  },
  getters: {
    user_log_id: state => {
      return state.user_log_id
    },
    loggedIn: state => {
      return state.isLoggedIn
    }
  },
  mutations: {
    setLoggedIn: (state, value) => {
      state.isLoggedIn = value
    },
    setUserID: (state, ID) => {
      state.user_log_id = ID
    }
  },
  actions: {
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/login', payload)
          .then((response) => {
            if (response.data.results) {
              commit('setLoggedIn', true)
              commit('setUserID', response.data.results.ID)
              resolve(true)
              console.log('SUCCESS' + response.data.results)
              return
            } 
            if (response.data.error) console.log('Error' + response.data.error)
            else console.log(response.data)
            commit('setLoggedIn', false)
          })
          .catch(error => {
            console.log('FAILURE')
            commit('setLoggedIn', false)
            reject(error)
          })
      })
    },
    SIGNUP: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/register', payload)
          .then((response) => {
            if (response.data.results) {
              commit('setLoggedIn', true)
              // commit('setUserID', response.data.results.ID)
              resolve(true)
              console.log('SUCCESS' + response.data.results)
              return
            } 
            if (response.data.error) console.log('Error' + response.data.error)
            else console.log(response.data)
            commit('setLoggedIn', false)
          })
          .catch(error => {
            console.log('FAILURE')
            commit('setLoggedIn', false)
            reject(error)
          })
      })
    }
  }
}