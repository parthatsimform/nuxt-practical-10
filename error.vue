<template>
    <div class="errorDiv">
        <h1 class="errorCode">{{ error.statusCode }}</h1>
        <p class="errorMsg">{{ error.message }}</p>
        <button class="homeBtn" @click="navigateTo('/')">Back to Home</button>
    </div>
</template>

<script setup>
const error = useError()
</script>

<style scoped>
.errorDiv {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.errorCode {
    font-size: 10rem;
    color: red;
    margin: 0;
}

.errorMsg {
    font-size: 3rem;
    color: rgb(255, 111, 111);
}

.homeBtn {
    border: 1px solid green;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    background-color: white;
    color: Green;
    cursor: pointer;
}

.homeBtn:hover {
    background-color: green;
    color: white;
}
</style>