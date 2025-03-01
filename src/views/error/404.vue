<template>
    <div class="layout">
        <div>
            <div class="d-flex justify-center align-center mx-2 order-1 order-md-0">
                <img src="/src/assets/images/404.png" alt="404" class="img-404">
            </div>
            <div class="d-flex flex-column align-center mx-2 order-0 order-md-1">
                <Icon404 />
                <h2 class="text-404">صفحه مورد نظر یافت نشد</h2>
            </div>
            <v-btn variant="outlined" color="#876824" class="mt-2 order-2 d-flex d-md-none" @click="backHome">بازگشت به
                خانه</v-btn>
        </div>
        <v-btn variant="outlined" color="#876824" class="mt-2 order-2 d-none d-md-flex" @click="backHome">بازگشت به
            خانه</v-btn>
    </div>
</template>

<script setup>
import Icon404 from '@/assets/images/icons/404.vue'
import router from '@/router';

const backHome = () => {
    router.push('./')
}

</script>

<style scoped>
.layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.layout>div {
    background-color: #F7F2E8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
}

@media(min-width:768px) {
    .layout>div {
        background-color: #F7F2E8;
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 60%;
        width: 60%;
    }
}

.img-404 {
    max-width: 100%;
}

.text-404 {
    margin-top: 2rem;
    color: #DDBE7D;
}
</style>