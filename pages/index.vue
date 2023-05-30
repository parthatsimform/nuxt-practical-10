<template>
    <div>
        <div v-if="userStore.loading" class="loader">
        </div>
        <div v-if="!userStore.loading">
            <Transition name="form" mode="out-in">
                <CarDataForm v-if="carStore.togglePopup" />
            </Transition>
            <div id="homeComponent" :class="{ fadeBG: carStore.togglePopup }">
                <div id="addCar">
                    <button class="addCarBtn" @click.prevent.stop="showCarForm">+ {{ $t('caradd') }}</button>
                </div>
                <div id="carComponent">
                    <TransitionGroup name="carCard" appear>
                        <div v-for="car in carStore.loadAllCars" :key="car.id">
                            <GalleryCard :car="car" />
                        </div>
                    </TransitionGroup>
                </div>
            </div>
            <div class="language">
                <form>
                    <select v-model="$i18n.locale" class="langSelect">
                        <option value="en">en</option>
                        <option value="fr">fr</option>
                        <option value="gu">gu</option>
                        <option value="hi">hi</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})
import { useCarStore } from '../stores/car'
import { useUserStore } from '../stores/user'
const carStore = useCarStore()
const userStore = useUserStore()

const { data, error } = await useFetchCars();
if (error.value) {
    throw createError(error);
}
carStore.cars = data.value
const showCarForm = () => {
    carStore.togglePopup = true
    carStore.title = "Add Car"
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Roboto:wght@500&display=swap');

body::before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("../assets/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.1;
    z-index: -1;
}

.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 10px solid #f3f3f3;
    border-top: 10px solid #20aa37;
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

/* Car Form transition */
.form-enter-from,
.form-leave-to {
    opacity: 0;
    transform: scale(0.2);
}

.form-enter-active,
.form-leave-active {
    transition: all 0.5s ease;
}

.form-leave-active {
    position: absolute;
}

/* Car Card Transition */
.carCard-enter-from,
.carCard-leave-to {
    opacity: 0;
    transform: translateX(-200px) scale(0.2);
}

.carCard-enter-active,
.carCard-leave-active {
    transition: all 0.6s ease-in;
}

.carCard-leave-active {
    position: absolute;
}

.carCard-move {
    transition: all 0.3s ease;
}

#homeComponent {
    padding: 10px 8%;
}

#addCar {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto 10px;
}

.addCarBtn {
    padding: 7px 20px;
    background-color: #e8ffdd;
    color: green;
    border: 1px solid green;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}

.addCarBtn:hover {
    color: #e8ffdd;
    background-color: green;
}

#carComponent {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 1%;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
}

#carComponent>div {
    display: flex;
    justify-content: center;
}

.language {
    position: fixed;
    bottom: 10px;
    right: 10px;
}

.langSelect {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 5px;
    background-color: green;
    border: 1px solid white;
    color: white;
    font-size: 16px;
    transition: all 0.2s linear;
}

.langSelect:hover {
    background-color: white;
    border: 1px solid green;
    color: black;
    border-radius: 0;
    width: 100px;
    height: 40px;
    transition: all 0.2s linear;
}

.fadeBG {
    filter: contrast(40%);
    pointer-events: none;
}

@media (max-width:1350px) {
    #carComponent {
        grid-template-columns: auto auto auto;
    }
}

@media (max-width:1050px) {
    #carComponent {
        grid-template-columns: auto auto;
    }
}

@media(max-width:570px) {
    #carComponent {
        grid-template-columns: auto;
    }
}
</style>