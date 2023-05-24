<template>
    <div>
        <no-ssr>
            <div class="login">
                <div class="formHeader">
                    <h2 class="formTitle">
                        Login
                    </h2>
                </div>
                <hr />
                <form class="loginForm" @submit.prevent="loginUser">
                    <label for="email">Email:</label>
                    <input type="text" id="email" v-model="user.email" @input="validateEmail(user.email)"
                        ref="emailInput" />
                    <div class="emailError"></div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="user.password" @input="validatePassword(user.password)"
                        ref="passwordInput" />
                    <div class="passwordError"></div>
                    <button type="submit" class="submitForm">Login</button>
                </form>
            </div>
        </no-ssr>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user';
import { mapWritableState } from 'pinia';
import formValidateMixin from '../mixins/formValidation'
export default {
    mixins: [formValidateMixin],
    computed: {
        ...mapWritableState(useUserStore, ['user'])
    },
    methods: {
        async loginUser() {
            if (this.validateEmail(this.user.email) && this.validatePassword(this.user.password)) {
                const user = await useLoginUser(this.user.email, this.user.password)
                if (user) {
                    this.isLoggedIn = true;
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("token", `ThisIsRandomKey`);
                    navigateTo("/");
                } else {
                    alert("User not found")
                    this.user.password = ""
                }
            } else {
                this.validateEmail(this.user.email)
                this.validatePassword(this.user.password)
            }
        }
    },
    setup() {
        const userStore = useUserStore()
        onBeforeRouteLeave((to, from) => {
            userStore.user.email = ''
            userStore.user.password = ''
        })
    }
}
</script>

<style>
.login {
    background-color: white;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    margin: 10% auto;
    padding: 20px 30px;
    border: 1px solid rgb(0, 90, 90);
}

.formHeader {
    display: flex;
}

.formTitle {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    color: rgb(0, 90, 90);
}

hr {
    border: 1px solid rgb(221, 221, 221);
}

.loginForm {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 20px;
}

input {
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(192, 192, 192);
    height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 5px 0 10px;
}

.emailError,
.passwordError {
    color: red;
}

.submitForm {
    background-color: white;
    border: 1px solid rgb(0, 90, 90);
    color: rgb(0, 90, 90);
    border-radius: 5px;
    outline: none;
    width: 100px;
    padding: 10px;
    margin: 10px auto;
    font-size: 16px;
    cursor: pointer;
}

.submitForm:hover {
    background-color: rgb(0, 90, 90);
    color: #e8ffdd;
    transition: all .3s ease;
}

@media(max-width: 460px) {
    .login {
        border: initial;
        border-radius: initial;
        width: 95%;
        max-width: initial;
        margin: 50% 0;
        padding: 0 10px;
    }
}
</style>