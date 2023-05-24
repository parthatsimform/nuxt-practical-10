<template>
    <div>
        <div v-if="userStore.loading" class="loader">
        </div>
        <div v-if="!userStore.loading">
            <div>
                <NuxtLink class="backBtn" to="/">
                    <svg class="backIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                        <path
                            d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
                    </svg>
                    <span>&nbsp;Back</span>
                </NuxtLink>
            </div>
            <div class="carDetail">
                <div class="carImg">
                    <img :src="carStore.loadCar.image" :alt="carStore.loadCar.name" />
                </div>
                <div class="carInfo">
                    <div class="carName">
                        <h2>{{ carStore.loadCar.name }}</h2>
                    </div>
                    <div class="carDesc">
                        <p>{{ carStore.loadCar.details }}</p>
                    </div>
                    <div class="carPrice">
                        <p>Price:&nbsp;<span>₹{{ carStore.loadCar.price }}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})
import { useCarStore } from "../../stores/car.js"
import { useUserStore } from '../../stores/user'
const carStore = useCarStore()
const userStore = useUserStore()
const route = useRoute()
carStore.carID = route.params.id
const { data, error } = await useFetchCar(carStore.carID)
if (error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: `Car with id:${carStore.carID} not found`,
    });
}
carStore.car = data.value;
</script>

<style scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #20aa37;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

a {
    text-decoration: none;
    color: black;
}

.backBtn {
    margin: 10px 9%;
    color: black;
    display: inline-flex;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: white;
    align-items: center;
}

.backIcon {
    width: 0.8em;
}

.carDetail {
    display: flex;
    background-color: white;
    width: 90%;
    max-width: 1400px;
    margin: 20px auto;
    border-radius: 10px;
    border: 1px solid rgb(221, 221, 221);
}

.carImg {
    width: 50%;
}

.carImg img {
    width: 90%;
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.carInfo {
    padding: 5px;
}

.carName {
    font-size: 2rem;
    color: rgb(7, 15, 56);
}

.carDesc {
    font-size: 1rem;
}

.carPrice p {
    display: inline-flex;
    background-color: rgb(0, 90, 90);
    color: white;
    padding: 10px 15px;
    border-radius: 50px;
}

@media(max-width: 420px) {
    .carDetail {
        background: none;
    }

    .carImg img {
        width: 100%;
        height: 100%;
        border: 0px;
    }
}

@media(max-width:720px) {
    .carDetail {
        flex-direction: column;
    }

    .carImg {
        width: 100%;
    }

    .carImg img {
        width: 100%;
        height: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0;
    }

    .carInfo {
        padding: 0 15px;
    }
}
</style>