<template>
  <Sigining>
    <div class="login">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        
        <b-form-group
          :state="idState"
          label-for="user-input"
          label="Username"
          prepend-icon="mdi-account-circle"
          invalid-feedback="Username is required"
        >
          <b-form-input
            id="id-input"
            v-model="id"
            :state="idState"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          :state="passwordState"
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="password"
            :state="passwordState"
            v-on:keyup.enter="login"
            required
          >
          </b-form-input>
        </b-form-group>
      </form>
        <button type="submit" @click.prevent.stop="login()" class="btn btn-dark btn-lg btn-block">Sign In</button>
        <b-alert variant="danger" v-if="fail" :show="fail" fade @dimssed="fail=false" dismissible>
          Username or Password are invalid
        </b-alert>
        <b-alert variant="pass" v-if="pass" :show="pass" fade @dimssed="pass=false" dismissible>
          Succesful login
        </b-alert>
        <p class="forgot-password text-right">
          Don't have an account?
        <router-link :to="{name: 'signup'}">Sign up</router-link>
        <b-button @click.prevent="forceLoginState()">forceLoginState</b-button>
        </p>
    </div>
  </Sigining>
</template>

<script>
// TODO: Manage user ID from login response in state
// Anytime I make a call to the api, I need to include the
// userID from state.
import Sigining from '../layouts/Signing.vue'
import axios from 'axios'
export default {
  name: 'login',
  components: {
    Sigining
  },
  data () {
    return {
      userId: 0,
      id: '',
      password: '',
      idState: null,
      passwordState: null,
      fail: false,
      pass: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false
    }
  },
  methods: {
    // login () {
    //   if (!this.fail || (this.id !== '' && this.password !== ''))  {
    //     this.$store.dispatch('user/LOGIN', {
    //       id: this.id,
    //       password: this.password
    //     })
    //       .then(response => {
    //         this.pass = true
    //         this.$router.push('/contacts')
    //       })
    //       .catch((error) => {
    //         if (error) console.log('Login catch errors: ' + error)
    //         this.fail = true
    //         vm.$forceUpdate();
    //       })
    //   }
    // },
    login () {
      if (!this.fail || (this.id !== '' && this.password !== ''))  {
        var postData = {
          id: this.id,
          password: this.password
        }
        axios
          .post('/api/login', postData)
          .then(response => {
            if (response.status == 200)
              console.log('SUCCESS ' + response.data.results)
              this.$store.commit('user/setLoggedIn', true)
              // this.$store.commit('setUserID', response.data.results.ID)
              this.pass = true
              this.$router.push('/home')
          })
          .catch((error) => {
            if (error) console.log('Login catch errors: ' + error)
            this.$store.commit('user/setLoggedIn', false)
            this.fail = true
            vm.$forceUpdate();
          })
      }
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    forceLoginState () {
      this.$router.push('/home')
      this.$store.commit('user/setLoggedIn', true)
    }
  }
}
</script>
