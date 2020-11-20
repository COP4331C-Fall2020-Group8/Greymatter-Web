<template>
  <Signing>
    <div>
      <form>
        <div class="form-group">
          <label>Username</label>
          <input v-model="id" type="text" class="form-control form-control-lg"/>
        </div>
        <div class="form-group">
          <label>First Name</label>
          <input v-model="name.first" type="text" class="form-control form-control-lg"/>
        </div>
                <div class="form-group">
          <label>Last Name</label>
          <input v-model="name.last" type="text" class="form-control form-control-lg"/>
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
    name: {
      first:'',
      last:''
    },
    email: '',
    password: '',
    confirmPassword: '',
    fail: false,
    pass: false
  }),
  methods: {
    signup () {     
      if (this.id !== ''){
        if (this.password === this.confirmPassword) {
          var postData = {
            id: this.id,
            password: this.password,
            name: {
              first: this.name.first,
              last: this.name.last
            },
            email: this.email,
          }
          axios
            .post('/api/register', postData)
            .then(response => {
              if (response.status == 200)
                console.log('Successful registration ' + response.data.results)
                this.$store.commit('user/setUserID', postData.id)
                this.$store.commit('user/setLoggedIn', true)
                this.$router.push('/home')
                alertReset ()
            })
            .catch((error) => {
              if (error) console.log(error)
              this.fail = true
              this.$store.commit('user/setLoggedIn', false)
                his.$store.commit('user/setUserID', -1)
              console.log('Here! ' + error)
              alertReset ()
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
