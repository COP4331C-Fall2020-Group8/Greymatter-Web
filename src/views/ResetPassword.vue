<template>
    <div>
        <Signing>
            <b-col>
                <b-input-group class="mt-3">
                <b-input-group-prepend is-text>
                    <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input 
                    v-model="user_id" 
                    type="text" 
                    placeholder="user_id"
                    readonly
                >
                </b-form-input>
                </b-input-group>

                <b-input-group class="mt-3">
                <b-input-group-prepend is-text>
                    <b-icon-lock-fill> </b-icon-lock-fill>
                </b-input-group-prepend>
                <b-form-input v-model="newPassword" type="password" placeholder="New Password"></b-form-input>
                </b-input-group>

                <b-input-group class="mt-3">
                <b-input-group-prepend is-text>
                    <b-icon-lock-fill> </b-icon-lock-fill>
                </b-input-group-prepend>
                <b-form-input v-model="confirmPassword" type="password" placeholder="Confirm Password"></b-form-input>
                </b-input-group>

                <b-button 
                    type="submit" 
                    variant="success" 
                    @click.prevent.stop="resetPassword()" 
                    class="mt-3 mb-2 btn-lg btn-block"
                >
                    Reset Password
                </b-button>

                <b-alert variant="danger" :show="fail" fade @dismissed="fail=false" dismissible>
                {{errorMessage}}
                </b-alert>
                <b-alert variant="success" :show="pass" fade @dismissed="pass=false" dismissible>
                {{successMessage}}
                </b-alert>
            </b-col>
        </Signing>
    </div>
</template>

<script>
import Signing from '../layouts/Signing.vue'
import axios from 'axios'

export default {
    name: 'resetpassword',
    components: {
        Signing
    },
    data: () => ({
        user_id: '',
        newPassword: '',
        confirmPassword: '',
        token: '',
        successMessage: '',
        errorMessage: '',
        pass: false,
        fail: false 
    }),
    methods: {
        resetPassword() {
            if (this.newPassword === this.confirmPassword){
                    var postData = {
                        id: this.user_id,
                        password: this.newPassword,
                        token: this.token
                }
                axios
                .post('/resetPassword', postData)
                .then(response => {
                    if (response.status == 200) {
                    console.log('Successful reset of passsword')
                    console.log(response)
                    this.successMessage = response.data.msg
                    this.$router.push('/login')
                    this.pass = true
                    }else {
                        console.log('->' + response)
                    }
                })
                .catch((error) => {
                    if (error.response.status == 400){ 
                        console.log(error.response)       
                        this.errorMessage = error.response.data.error
                        this.fail = true
                    } else if (error.response.status == 401) {
                    console.log(error.response)
                        this.errorMessage = error.response.data.error
                        this.fail = true
                    }
                    if (error.response) {
                        console.log('response exists')
                        console.log(error.response)
                    }
                    if (error.request) {
                        console.log("request exists")
                        console.log(error.request)
                    } else {
                        console.log("Nothing exists")
                        console.log(error)
                        this.errorMessage = error
                        this.fail = true
                    }
                })
            }
        }
    },
    beforeMount() {
        this.user_id = this.$route.params.id;
        this.token = this.$route.params.token;
    }
    
}
</script>
