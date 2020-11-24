<template>
    <Sigining>
        <div>
            <h4 class="text-center">Forgot Password?</h4>
            <b-input-group class="mt-3">
                <b-input-group-prepend is-text>
                    <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="user_id" type="text" placeholder="Username">
                </b-form-input>
            </b-input-group>
                
                <b-button 
                type="submit" 
                variant="success" 
                @click.prevent.stop="submitData()" 
                class="mt-3 mb-2 btn-lg btn-block">
                    Submit
                </b-button>
                
                <p class="forgot-password text-right">
                Nevermind, back to
                <router-link :to="{name: 'login'}">sign in?</router-link>
                {{pass}}
                </p>

            <b-alert variant="danger" :show="fail" fade @dismissed="fail=false" dismissible>
            {{errorMessage}}
            </b-alert>
            <b-alert variant="success" :show="pass" fade @dismissed="pass=false" dismissible>
            {{successMessage}}
            </b-alert>
        </div>
    </Sigining>
</template>

<script>
import Sigining from '../layouts/Signing.vue'
import axios from 'axios'

export default {
    name: 'forgotpassword',
    components: {
    Sigining
    },
    data () {
        return {
            user_id: '',
            errorMessage:'',
            successMessage: '',
            fail: false,
            pass: false,
        }
    },
    methods: {
        submitData() {
            if (this.user !== '') {
                var postData = {
                    id: this.user_id
                }
                axios
                .post('/forgotPassword', postData)
                .then(response => {
                    if (response.status == 200) {
                        console.log('Successful login ')
                        console.log(response.data)
                        // this.$store.commit('user/setUserID', postData.id)
                        // this.$store.commit('user/setLoggedIn', true)
                        this.successMessage = response.data.msg
                        this.pass = true
                        // this.$router.push('/login') 
                    }else {
                        console.log('->' + response)
                    }
                })
                .catch((error) => {
                    // if (error) {
                    //     console.log('In if not else')
                    //     console.log(error)
                    // }
                    if (error.response) {
                        console.log('response exists')
                        console.log(error.response)
                    }
                    if (error.request) {
                        console.log("request exists")
                        console.log(error.request)
                    }
                    if (error.response.status == 400){ 
                        console.log(error.response)
                        this.$store.commit('user/setLoggedIn', false)
                        this.errorMessage = error.response.data.error
                        this.fail = true
                        // this.resetAlerts()
                    } else if (error.response.status == 401) {
                    console.log(error.response)
                        this.$store.commit('user/setLoggedIn', false)
                        this.errorMessage = error.response.data.error
                        this.fail = true
                    } 
                    else {
                        console.log("Nothing exists")
                        console.log(error)
                        this.errorMessage = error
                        this.fail = true
                    }
                })
            }
        }
    }
}
</script>