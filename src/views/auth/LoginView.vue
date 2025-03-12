<template>
    <v-card class="auth-card" max-width="360" width="100%">
        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>

        <div class="k-stepper">
            <div class="step active">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">ورود</p>
            </div>
            <div class="divider active"></div>
            <div class="step">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">تایید شماره</p>
            </div>
            <div class="divider"></div>
            <div class="step">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">ثبت اطلاعات</p>
            </div>
            <div class="divider"></div>
            <div class="step">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">احراز هویت</p>
            </div>
        </div>
        <img src="/src/assets/logo.svg" alt="خانه طلا" class="my-5">
        <h3>ورود به حساب کاربری</h3>
        <v-form ref="form" v-model="isValid" @submit.prevent="submitPhone" class="auth-form">
            <v-sheet color="surface">
                <v-text-field v-model="mobileNumber" type="text" label="شماره همراه" variant="outlined"
                    :rules="mobileRules" @input="limitInput" class="k-textfield"></v-text-field>
            </v-sheet>
            <v-btn type="submit" class="my-6" height="40" text="ارسال کد تایید" variant="elevated" width="100%"
                color="#B0863B" :disabled="!isValid" :loading="loading"></v-btn>
            <p class="site-url">آدرس رسمی سامانه<span class="k-primary"> www.khanetala.ir </span>میباشد</p>
        </v-form>
    </v-card>

</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import AuthService from '@/service/auth/auth';


const mobileNumber = ref('');
const isValid = ref(false);
const loading = ref(false);
const errorMsg = ref('');
const alertError = ref(false);

const mobileRules = [
    (v) => !!v || 'شماره همراه نمی‌تواند خالی باشد',
    (v) => /^\d{11}$/.test(v) || 'شماره همراه باید 11 رقم باشد',
    (v) => v.startsWith('09') || 'شماره همراه باید با 09 شروع شود',
];


const limitInput = () => {
    mobileNumber.value = mobileNumber.value.replace(/\D/g, '').slice(0, 11);
}



const submitPhone = async () => {
    try {
        loading.value = true;
        const response = await AuthService.Login(mobileNumber.value);
        router.replace('/OTP');
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 5000)
    } finally {
        loading.value = false;
    }
}






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
    margin-top: 4rem;
}

.k-primary {
    color: #AE8A48;
}

.k-textfield {
    border-radius: 8px !important;
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