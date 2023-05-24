<template>
    <div>
        <nav>
            <div class="navContent">
                <h1>
                    <NuxtLink to="/" exact-active-class="no-active" class="navBarBrand">
                        <span>{{ $t('brand') }}</span>
                    </NuxtLink>
                </h1>
                <div class="navBtns">
                    <template v-if="!userStore.isLoggedIn">
                        <NuxtLink to="/login" class="navBtn">{{ $t('login') }}</NuxtLink>
                        <NuxtLink to="/register" class="navBtn">{{ $t('register') }}</NuxtLink>
                    </template>
                    <template v-else>
                        <NuxtLink to="/" class="navBtn">{{ $t('home') }}</NuxtLink>
                        <NuxtLink to="/login" class="navBtn" @click="userStore.logOut">{{ $t('logout') }}</NuxtLink>
                    </template>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
</script>

<style scoped>
nav {
    background-color: white;
}

.navContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 2%;
    border-bottom: 1px solid green;
}

h1 {
    margin: 0;
    padding: 10px 0;
    font-size: 2.5rem;
}

h1 span {
    color: #184b00;
    cursor: pointer;
}

h1 span:hover {
    color: green;
}

.navBarBrand {
    text-decoration: none;
}

.navBtns {
    display: flex;
    justify-content: space-between;
}

.navBtn {
    text-decoration: none;
    color: black;
    padding: 5px 15px;
    font-size: 1.2rem;
    background-size: 200%;
}

.router-link-active {
    border-radius: 5px;
    background-color: rgb(0, 90, 90);
    color: white;
    font-weight: 600;
    transition: all 0.2s ease;
}

.no-active {
    background-color: transparent;
}

@media(max-width:666px) {
    h1 {
        font-size: 2rem;
    }

    .navBtn {
        padding: 5px 5px;
        font-size: 1rem;
    }
}

@media(max-width:436px) {
    h1 {
        font-size: 1.5rem;
    }
}

@media(max-width:383px) {
    h1 {
        font-size: 1.4rem;
    }

    .navBtn {
        padding: 5px 5px;
        font-size: 0.8rem;
    }
}

@media(max-width:334px) {
    h1 {
        font-size: 1.2rem;
    }

    .navBtn {
        padding: 2px 2px;
        font-size: 0.7rem;
    }
}
</style>