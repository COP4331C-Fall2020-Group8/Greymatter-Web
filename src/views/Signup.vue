<template>
  <Signing>
    <div>
      <div>
      <form>
        
         <!-- <h3 class="text-center">Create An Account</h3> -->
        <!-- User Name -->
        <b-form-group
          :state="state.username"
          label="Username"
          label-for="user-input"
          invalid-feedback="Username is required"
        >
          <b-form-input
            id="username-input"
            type="text"
            v-model="id"
            :state="state.username"
            placeholder="ghost"
            required
          >
          </b-form-input> 
        </b-form-group>
        <!-- First Name -->
        <b-form-group
          :state="state.first"
          label="First Name"
          label-for="first-input"
          invalid-feedback="First name is required"
        >
          <b-form-input
            id="first-input"
            type="text"
            v-model="name.first"
            :state="state.first"
            placeholder="Jon"
            required
          >
          </b-form-input> 
        </b-form-group>
        <!-- Last Name  -->
         <b-form-group
          :state="state.last"
          label="Last Name"
          label-for="last-input"
          invalid-feedback="Last name is required"
        >
          <b-form-input
            id="last-input"
            type="text"
            v-model="name.last"
            :state="state.last"
            placeholder="Snow"
            required
          >
          </b-form-input> 
        </b-form-group>
        <!-- Email -->
        <b-form-group
          :state="state.email"
          label="Email Address"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="email-input"
            type="email"
            v-model="email"
            :state="state.email"
            placeholder="stark@example.com"
            required
          >
          </b-form-input> 
        </b-form-group>
        <!-- Password -->
        <b-form-group
          :state="state.password"
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="password"
            :state="state.password"
            placeholder="********"
            v-on:input="passwordStrength()"
            required
          ></b-form-input>
          <b-badge 
            pill 
            class="md-1"
            :variant="passStrengthPillVariant"
          >
            Password Strength: 
            {{passStrengthPillLabel}}
            </b-badge>
        </b-form-group>
        <!-- Confirm Password -->
        <b-form-group
          :state="state.confirm"
          label="Confirm Password"
          label-for="confirmPassword-input"
          invalid-feedback="Confirm Password is required"
        >
          <b-form-input
            id="confirmPassword-input"
            type="password"
            v-model="confirmPassword"
            :state="state.confirm"
            placeholder="********"
            required
          >
          </b-form-input> 
        </b-form-group>
        
        <b-button type="submit" variant="success" @click.prevent="signup()" class=" btn-lg btn-block">Sign Up</b-button>
        <b-alert variant="danger" :show="fail" fade @dismissed="fail=false" dismissible>
          {{errorMessage}}
        </b-alert>
        <b-alert variant="success" :show="pass" fade @dismissed="pass=false" dismissible>
          Succesful Registration!
        </b-alert>
        <p class="forgot-password text-right">
          Already registered
        <router-link :to="{name: 'login'}">sign in?</router-link>
        </p>
      </form>
    </div>
        <!-- <div class="form-group">
          <label>First Name</label>
          <input v-model="name.first" type="text" class="form-control form-control-lg"/>
        </div>
                <div class="form-group">
          <label>Last Name</label>
          <input v-model="name.last" type="text" class="form-control form-control-lg"/>
        </div> -->

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
    email: '',
    password: '',
    confirmPassword: '',
    name: {
      first:'',
      last:''
    },
    state: {
        username: null,
        password: null,
        email: null,
        first: null,
        last: null
    },
    fail: false,
    pass: false,
    passwordVal: {
        hasNumber: false,
        hasUpper: false,
        hasSpecial: false,
        isLong: false,
    },
    passStrengthPillVariant: "secondary",
    passStrengthPillLabel: "Nothing Entered Yet",
    errorMessage:'',
    successMessage:''

  }),
  computed: {
    usernameInvalidFeedback() {
        return "Must Be A Valid Email";
    }
  },
  methods: {
    checkPasswordRequirements(){
        var isEightOrLonger = /^(?=.{8,72})/;
        var hasUppercase = /^(?=.*[A-Z])/;
        var hasNumber = /^(?=.*[0-9])/;
        var specialCharacters = /[^A-Za-z0-9]+/;
        var hasSpecialChar= /^(?=.[!@#\$%\^&])/;

        this.passwordVal.isLong = isEightOrLonger.test(this.password);
        this.passwordVal.hasNumber = hasNumber.test(this.password);
        this.passwordVal.hasSpecial = specialCharacters.test(this.password);
        this.passwordVal.hasUpper = hasUppercase.test(this.password);
    },
    passwordStrength(){
        this.checkPasswordRequirements();
        var str = 0; 
        var meetsMin = false;
        if(this.passwordVal.isLong){str = str + 1; meetsMin = true;}
        if(this.passwordVal.hasNumber){str = str + 1;}
        if(this.passwordVal.hasSpecial){str = str + 1;}
        if(this.passwordVal.hasUpper){str = str + 1;}
        if(!meetsMin){
            str = 0;
        }
        if(str == 0){
            this.passStrengthPillLabel = "Unsuitable - Must Be 8 Characters Long"
            this.passStrengthPillVariant = "danger"
        }
        if(str == 1){
            this.passStrengthPillLabel = "Weak"
            this.passStrengthPillVariant = "warning"
        }
        if(str == 2){
            this.passStrengthPillLabel = "Marginal"
            this.passStrengthPillVariant = "secondary"
        }
        if(str == 3){
            this.passStrengthPillLabel = "Good"
            this.passStrengthPillVariant = "info"
        }
        if(str == 4){
            this.passStrengthPillLabel = "Excellent"
            this.passStrengthPillVariant = "success"
        }
    },
    editingEmail(){
        this.state.email = null;
    },
    usernameIsEmail(event){
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.state.email= emailRegex.test(this.email);

    },
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
            // .post('/api/register', postData)
            .post('/register', postData)
            .then(response => {
              if (response.status == 200)
                console.log('Successful registration ' + response.data.results)
                this.$store.commit('user/setUserID', postData.id)
                this.$store.commit('user/setLoggedIn', true)
                this.$router.push('/home')
                alertReset ()
            })
            .catch((error) => {
                if (error.response.status == 401) { 
                    console.log(error.response)
                    this.errorMessage = error.response.data.error
                    this.fail = true
                    this.$store.commit('user/setLoggedIn', false)
                    this.$store.commit('user/setUserID', -1)
                } else if (error.response.status == 500){
                    this.errorMessage = 'All inputs need to be filled'
                    this.fail = true
                } else if (error.response.status == 401){
                    this.errorMessage = error.response.data.error
                    this.fail = true
                }else if (error.response.status == 402){
                    this.errorMessage = error.response.data.error
                    this.fail = true
                }
            })
        } else { 
            this.fail = true
            this.errorMessage = 'Password does not match'
        }
      } else { 
          this.fail = true 
          this.errorMessage = 'Username required'
        }  
    },
    alertReset () {
      this.fail = false,
      this.pass = false 
    } 
  }
}
</script>
