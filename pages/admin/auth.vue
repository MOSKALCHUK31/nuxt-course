<template>
    <div class="admin-auth-page">
        <div class="auth-container">
            <form @submit.prevent="handleSubmit">
                <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
                <AppControlInput type="password" v-model="password">Password</AppControlInput>
                <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
                <AppButton type="button" btn-style="inverted" style="margin-left: 10px" @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AdminAuthPage',

    layout: 'admin',

    computed: {
        currentUrl() {
            const signIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ process.env.apiKey }`
            const signUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ process.env.apiKey }`

            return this.isLogin ? signIn : signUp
        }
    },

    data() {
        return {
            isLogin: true,
            email: '',
            password: ''
        }
    },

    methods: {
        handleSubmit() {
            const data = {
                email: this.email,
                password: this.password,
                returnSecureToken: true,
                url: this.currentUrl
            }

            this.$store.dispatch('HANDLE_AUTH_ACTION', data)
                .then(() => {
                    this.$router.push('/')
                })
        }
    }
}
</script>

<style scoped>
.admin-auth-page {
    padding: 20px;
}

.auth-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 2px #ccc;
    width: 300px;
    margin: auto;
    padding: 10px;
    box-sizing: border-box;
}
</style>

