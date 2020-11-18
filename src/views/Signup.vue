<template>
  <Signing>
    <div class="login">
      <form>
        <div class="form-group">
          <label>Username</label>
          <input v-model="id" type="text" class="form-control form-control-lg"/>
        </div>
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="name" type="text" class="form-control form-control-lg"/>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input v-model="email" type="email" id="email" name="email" class="form-control form-control-lg" />
        </div>
        <div class="form-group">
          <label for="pwd">Password</label>
          <input v-model="password" type="password" id="pwd" name="pwd" class="form-control form-control-lg" />
        </div>
        <div class="form-group">
          <label for="cpwd">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="cpwd" name="cpwd" class="form-control form-control-lg" />
        </div>
         <b-alert variant="danger" :show="fail" fade @dimssed="alertReset()" dismissible>
          Password does not match
        </b-alert>
        <b-alert variant="pass" :show="pass" fade @dimssed="alertReset()" dismissible>
          Succesful Registration!
        </b-alert>
         <button type="submit" @click.prevent="signup(), fail, pass" class="btn btn-dark btn-lg btn-block">Sign Up</button>
        <p class="forgot-password text-right">
          Already registered
        <router-link :to="{name: 'login'}">sign in?</router-link>
        </p>
      </form>
    </div>
  </Signing>
</template>

<script>
import Signing from '../layouts/Signing.vue'
import axios from 'axios'
export default {
  name: 'signup',
  components: {
    Signing
  },
  data: () => ({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fail: false,
    pass: false
  }),
  methods: {
    // signup () {     
    //   if (this.id !== ''){
    //     if (this.password === this.confirmPassword) {
    //       this.$store.dispatch('user/SIGNUP', {
    //         id: this.id,
    //         name: this.name,
    //         password: this.password,
    //         email: this.email,
    //       })
    //         .then(success => {
    //           this.$router.push('/home')
    //         })
    //         .catch((error) => {
    //           if (error) console.log(error)
    //           this.fail = true
    //           console.log('Here!!! ' + error)
    //         })
    //     } else { this.fail = true }
    //   } else { this.fail = true }  
    // },
    signup () {     
      if (this.id !== ''){
        if (this.password === this.confirmPassword) {
          var postData = {
            id: this.id,
            name: this.name,
            password: this.password,
            email: this.email,
          }
          axios
            .post('/api/register', postData)
            .then(response => {
              if (response.status == 200)
                console.log('SUCCESS ' + response.data.results)
                this.$store.commit('user/setLoggedIn', true)
                // this.$store.commit('user/setUserID', -1)
                this.$router.push('/home')
            })
            .catch((error) => {
              if (error) console.log(error)
              this.fail = true
              this.$store.commit('user/setLoggedIn', false)
              console.log('Here! ' + error)
            })
        } else { this.fail = true }
      } else { this.fail = true }  
    },
    foo(){
      var obj={
        _id: 5
      };
    },
    alertReset () {
      this.fail = false,
      this.pass = false 
    } 
  }
}
</script>
