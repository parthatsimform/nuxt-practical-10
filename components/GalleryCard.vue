<template>
    <div class="card">
        <div class="cardHeader">
            <Transition name="edit">
                <div class="editBtnDiv">
                    <button class="editBtn" @click.prevent.stop="editFormOpen(props.car)" title="Edit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                    </button>
                </div>
            </Transition>
            <div class="cardTitle">
                <h2>{{ car.name }}</h2>
            </div>
            <div class="deleteBtnDiv">
                <button class="deleteBtn" @click.prevent.stop="removeCar(props.car)" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="cardImgDiv">
            <img :src="props.car.image" :alt="props.car.name" class="cardImg">
        </div>
        <div class="cardDsc">
            <p>{{ props.car.details }}</p>
        </div>

        <div class="info">
            <NuxtLink :to="`/details/${car.id}`" class="infoBtn">
                {{ $t('info') }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useCarStore } from '../stores/car';
const carStore = useCarStore()
const props = defineProps(["car"])

const removeCar = async (car) => {
    if (confirm("Are you sure you want to delete " + car.name + "?")) {
        const status = await useDeleteCar(car.id);
        if (status) {
            const { data, error } = await useFetchCars();
            if (error.value) {
                throw createError(error);
            }
            carStore.cars = data.value
        }
    }
}

const editFormOpen = (car) => {
    carStore.togglePopup = true
    carStore.title = "Edit Car"
    carStore.editableCar = car
}
</script>

<style scoped>
.card {
    width: 300px;
    height: auto;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid rgb(221, 221, 221);
}

.card:hover {
    background-color: #e8ffdd;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid green;
}

.cardHeader {
    display: flex;
    margin: 0 0 10px;
    justify-content: space-between;
}

.cardTitle {
    font-family: 'Roboto', sans-serif;
    height: 75px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 2px;
    text-overflow: ellipsis;
}

.cardImg {
    width: 100%;
    height: 200px;
}

.cardDsc {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 5px;
    font-weight: 100;
    height: 112px;
    overflow: hidden;
}

.info {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}

.infoBtn {
    border: 1px solid green;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 7px 30px;
    width: 80%;
    background-color: green;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
    text-decoration: none;
}

.infoBtn:hover {
    color: #c7ffab;
    background-color: green;
}

.notAvailable {
    background-color: #ebffd8;
    color: black;
    cursor: not-allowed;
}

.notAvailable:hover {
    color: black;
    background-color: #ebffd8;
}

.editBtn,
.deleteBtn {
    padding: 10px;
    border: none;
    font-size: 18px;
    cursor: pointer;
    display: none;
    width: 2em;
    fill: white;
}

.editBtn:hover,
.deleteBtn:hover {
    transform: scale(130%);
    transition: all 0.3s ease;
}

.editBtn {
    border-bottom-right-radius: 10px;
    background-color: orange;
}

.deleteBtn {
    background-color: red;
    border-bottom-left-radius: 10px;
}

.card:hover .editBtn,
.card:hover .deleteBtn {
    display: block;
}

.editBtn:hover,
.deleteBtn:hover {
    filter: drop-shadow(0 0 0.1rem crimson);
}

@media(max-width:761px) {
    .card {
        width: 260px;
    }

    .cardImg {
        height: 190px;
    }

    .info {
        width: 95%;
        margin: 0 auto;
    }
}

@media(max-width:666px) {
    .cardImg {
        height: 210px;
    }

    .info {
        width: 100%;
    }
}

@media(max-width:570px) {
    .card {
        width: 300px;
    }

    .info {
        width: 100%;
    }
}

@media(max-width:303px) {
    .card {
        width: 290px;
    }
}
</style>