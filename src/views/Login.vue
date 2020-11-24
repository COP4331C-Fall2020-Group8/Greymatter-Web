<template>
  <Sigining>
    <div>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-col>
        <b-input-group class="mt-4">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input v-model="id" type="text" placeholder="Username"></b-form-input>
        </b-input-group>
        <!-- <b-form-group
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
        </b-form-group> -->
        
        <b-input-group class="mt-4">
          <b-input-group-prepend is-text>
            <b-icon-lock-fill> </b-icon-lock-fill>
          </b-input-group-prepend>
          <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
        </b-input-group>

        </b-col>

        <!-- <b-form-group
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
        </b-form-group> -->
      </form>
        <b-button type="submit" variant="success" @click.prevent.stop="login()" class="mt-3 btn-lg btn-block">Sign In</b-button>
        <b-alert 
        variant="danger" 
        dismissible 
        :show="fail" 
        fade 
        @dismissed="fail=false" 
        >{{errorMessage}} 
        </b-alert>

        <b-alert variant="pass" :show="pass" fade @dismissed="pass=false" dismissible>
          Succesful login
        </b-alert>
        <p class="forgot-password text-right">
          Don't have an account?
        <router-link :to="{name: 'signup'}">Sign up</router-link>
        <!-- <b-button @click.prevent="forceLoginState()">forceLoginState</b-button> -->
        </p>
        <p class="forgot-password text-center"> 
        <router-link :to="{name: 'forgotpassword'}">Forgot Password?</router-link>
        </p>
    </div>
  </Sigining>
</template>

<script>
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
      showDismissibleAlert: false,
      errorMessage:''
    }
  },
  methods: {
    login () {
      if (!this.fail || (this.id !== '' && this.password !== ''))  {
        var postData = {
          id: this.id,
          password: this.password
        }
        axios
          // .post('/api/login', postData)
          .post('/login', postData)
          .then(response => {
            if (response.status == 200) {
              console.log('Successful login ' + response.data.results)
              this.$store.commit('user/setUserID', postData.id)
              this.$store.commit('user/setLoggedIn', true)
              this.pass = true
              this.$router.push('/home')
            }else {
                console.log('->' + response)
            }
          })
          .catch((error) => {
            if (error.response.status == 401){ 
                console.log(error.response)
                this.$store.commit('user/setLoggedIn', false)
                this.errorMessage = error.response.data.error
                this.fail = true
                // this.resetAlerts()
            } else if (error.response.status == 402) {
              console.log(error.response)
                this.$store.commit('user/setLoggedIn', false)
                this.errorMessage = error.response.data.error
                this.fail = true
            }
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
      this.$store.commit('user/setLoggedIn', true)
      this.$store.commit('user/setUserID', this.id)
      this.$router.push('/home') 
    }
  }
}
</script>
