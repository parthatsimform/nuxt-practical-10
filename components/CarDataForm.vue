<template>
    <div class="carPopup">
        <div class="carData">
            <div class="formHeader">
                <div class="formTitle">
                    <h2>{{ title }}</h2>
                </div>
                <div class="closePopup" @click="closePopup">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </div>
            </div>

            <hr />
            <form class="carForm" @submit.prevent="addOrEditCarData">
                <label for="carName">Car Name*</label>
                <input id="carName" v-model="car.name" @input="validateCarName" ref="carNameInput" />
                <div class="carNameError"></div>
                <label for="carImage">Car Image*</label>
                <input id="carImage" v-model="car.image" @input="validateImage" ref="imageInput" />
                <div class="imageError"></div>
                <label for="cardetails">Details*</label>
                <textarea id="cardetails" cols="30" rows="4" v-model="car.details" @change="validatedetails"
                    ref="detailsInput" />
                <div class="detailsError"></div>
                <label for="carPrice">Car Price(₹)*</label>
                <input id="carPrice" v-model="car.price" @input="validatePrice" ref="priceInput" />
                <div class="priceError"></div>
                <button type="submit" id="submitForm">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import { useCarStore } from '../stores/car'
import { mapState, mapWritableState } from 'pinia';
import formValidateMixin from '../mixins/formValidation'
export default {
    mixins: [formValidateMixin],
    computed: {
        ...mapState(useCarStore, ['car', 'title', 'editableCar']),
        ...mapWritableState(useCarStore, ['cars', 'togglePopup'])
    },
    methods: {
        async showUpdatedCars() {
            const { data, error } = await useFetchCars();
            if (error.value) {
                throw createError(error);
            }
            this.cars = data.value
            this.closePopup()
        },
        async addOrEditCarData() {
            if (this.validateCarName() && this.validateImage() && this.validatedetails() && this.validatePrice()) {
                const carData = {
                    name: this.car.name,
                    image: this.car.image,
                    details: this.car.details,
                    price: this.car.price,
                }
                if (this.title == "Add Car") {
                    const { added, error } = await useAddCar(carData)
                    if (error.value) {
                        return alert("Error code: " + error.value.statusCode + " - " + error.value.statusMessage)
                    }
                    if (added) {
                        this.showUpdatedCars()
                    }
                }
                if (this.title == "Edit Car") {
                    carData.id = this.car.id;
                    const { edited, error } = await useEditCar(carData)
                    if (error.value) {
                        return alert("Error code: " + error.value.statusCode + " - " + error.value.statusMessage)
                    }
                    if (edited) {
                        this.showUpdatedCars()
                    }
                }
            } else {
                this.validateCarName()
                this.validateImage()
                this.validatedetails()
                this.validatePrice()
            }
        },
        closePopup() {
            this.togglePopup = false
            this.car.name = ""
            this.car.image = ""
            this.car.details = ""
            this.car.price = ""
        }
    },
    mounted() {
        if (this.title == "Edit Car") {
            this.car.id = this.editableCar.id
            this.car.name = this.editableCar.name
            this.car.image = this.editableCar.image
            this.car.details = this.editableCar.details
            this.car.price = this.editableCar.price
        }
    }
}
</script>

<style scoped>
.carPopup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.carData {
    background-color: white;
    border: 1px solid green;
    border-radius: 10px;
    width: 85%;
    max-width: 500px;
    min-height: 600px;
    padding: 20px 30px;
}

.formHeader {
    display: flex;
}

.closePopup {
    cursor: pointer;
    width: 1em;
}

.formTitle {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    color: #184b00;
}

hr {
    border: 1px solid rgb(221, 221, 221);
}

.carForm {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 20px;
}

input,
textarea {
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(192, 192, 192);
    height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 5px 0 10px;
}

textarea {
    padding: 7px;
    height: 82px;
}

/* remove aerrow from number input field */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.carNameError,
.imageError,
.detailsError,
.priceError {
    color: red;
}


#submitForm {
    background-color: #e8ffdd;
    border: 1px solid green;
    color: green;
    border-radius: 5px;
    outline: none;
    width: 100px;
    padding: 10px;
    margin: 10px auto;
    font-size: 16px;
    cursor: pointer;
}

#submitForm:hover {
    background-color: green;
    color: #e8ffdd;
}

::placeholder {
    color: red;
}
</style>