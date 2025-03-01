<template>
    <v-card class="auth-card" max-width="360" width="100%">
        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>
        <div class="k-stepper">
            <div class="step verified">
                <div>
                    <span class="circle">
                        <span class="mdi mdi-check"></span>
                    </span>
                </div>
                <p class="mb-0">ورود</p>
            </div>
            <div class="divider verified"></div>
            <div class="step verified">
                <div>
                    <span class="circle">
                        <span class="mdi mdi-check"></span>
                    </span>
                </div>
                <p class="mb-0">تایید شماره</p>
            </div>
            <div class="divider verified"></div>
            <div class="step verified">
                <div>
                    <span class="circle">
                        <span class="mdi mdi-check"></span>
                    </span>
                </div>
                <p class="mb-0">ثبت اطلاعات</p>
            </div>
            <div class="divider verified"></div>
            <div class="step active">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">احراز هویت</p>
            </div>
        </div>
        <img src="/src/assets/logo.svg" alt="خانه طلا" class="my-5">
        <h3>تایید اطلاعات</h3>
        <v-form ref="form" @submit.prevent="submitIdentityInfo" class="auth-form">
            <v-sheet class="mt-0">
                <div class="d-flex w-100">
                    <div class="d-flex flex-column align-start w-50">
                        <p class="info-text">نام</p>
                        <p class="info-text">نام خانوادگی</p>
                        <p class="info-text">نام پدر</p>
                        <p class="info-text">کد ملی</p>
                        <p class="info-text">شماره همراه</p>
                        <p class="info-text">جنسیت</p>
                        <p class="info-text">شهر</p>
                    </div>
                    <div class="d-flex flex-column align-start w-50">
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-else>{{ userData.firstName }}</p>
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-else>{{ userData.lastName }}</p>
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-else>{{ userData.fatherName }}</p>
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-else>{{ userData.nationalCode }}</p>
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-else>{{ userData.phoneNumber }}</p>
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-if="userData.gender == 0">خانم</p>
                        <p class="info-text" v-if="userData.gender == 1">آقا</p>
                        <v-progress-circular v-if="loading" :size="10" color="#fff" indeterminate></v-progress-circular>
                        <p class="info-text" v-else>{{ userData.officeName }}</p>
                    </div>
                </div>

            </v-sheet>

            <v-btn type="submit" class="my-6" height="40" text="تایید و ورود" variant="elevated" width="100%"
                color="#B0863B" :loading="loading"></v-btn>
            <p class="site-url">آدرس رسمی سامانه<span class="k-primary"> www.khanetala.ir </span>میباشد</p>
        </v-form>
    </v-card>

</template>

<script setup>
import router from '@/router';
import AuthService from '@/service/auth/auth';
import { ref, onMounted } from 'vue';


const loading = ref(false);
const alertError = ref(false);
const errorMsg = ref('');
const userData = ref({});


// const getInfo = async () => {
//     try {
//         identifyForm.value = JSON.parse(localStorage.getItem('identifyForm'));
//         identifyForm.value.phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
//         loading.value = true;
//         // const response = await AuthService.VerifyIdentity(identifyForm.value);
//         // userData.value = response.user;
//         userData.value = identifyForm.value
//         return response
//     } catch (error) {
//         errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
//         alertError.value = true;
//         setTimeout(() => {
//             alertError.value = false;
//         }, 5000)
//     } finally {
//         loading.value = false;
//     }
// }



const getInfo = async () => {
    try {
        loading.value = true;
        userData.value = JSON.parse(localStorage.getItem('userData'));
    } catch (error) {
        errorMsg.value = 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 5000)
    } finally {
        loading.value = false;
    }
}



const submitIdentityInfo = async () => {
    router.push('/');
}


onMounted(() => {
    getInfo();
})

</script>

<style scoped>
.auth-card {
    height: 100%;
    background-color: rgba(253, 251, 247, 1);
    backdrop-filter: blur(40px);
    box-shadow: -3px 4px 14px 0px rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(174, 137, 71, 1);
    border-radius: 16px;
    padding: 36px;
    text-align: center;
}

.auth-card h3 {
    font-size: 28px;
    font-weight: 400;
}

.submit-btn:disabled {
    background-color: rgba(189, 189, 189, 1);
}

.v-stepper-item {
    flex-direction: column;
    padding: 0;
    font-size: 12px;
}

.v-stepper {
    background-color: transparent;
}

.v-stepper-header {
    box-shadow: none !important;
    min-height: 3rem;
}


.v-stepper-header .v-divider {
    padding-bottom: 15px;
}

.v-stepper.v-sheet {
    box-shadow: none !important;
}

.v-stepper-item .v-stepper-item__avatar {
    width: 18px !important;
    height: 18px !important;
}

.stepper-divider {
    height: 1px;
    background-color: rgba(0, 96, 58, 1);
    width: 100%;
    margin-bottom: 32px;
}

.auth-form>div {
    background-color: transparent !important;
    margin-top: 1.5rem;
}

.site-url {
    font-size: 12px;
    font-weight: 700;
    margin-top: 1rem;
}

.k-primary {
    color: #AE8A48;
}

.first-select {
    margin-left: 0.5rem;
}

.second-select {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

.third-select {
    margin-right: 0.5rem;
}

.info-text {
    color: rgba(0, 96, 58, 1);
    font-weight: 400;
    margin: 0.5rem 0;
}

.k-alert {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 12px;
    padding: 2px !important;
}
</style>