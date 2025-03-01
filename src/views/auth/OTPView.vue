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
            <div class="step active">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">تایید شماره</p>
            </div>
            <div class="divider active"></div>
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
        <h3>تایید شماره همراه</h3>
        <v-form ref="form" v-model="isValid" @submit.prevent="submitOTP" class="auth-form">
            <v-sheet color="surface">

                <v-otp-input :length="4" v-model="otp" type="number" variant="outlined" class="otp-input"></v-otp-input>

            </v-sheet>

            <div class="d-flex justify-start align-center">
                <editIcon />
                <router-link to="/login" class="login-link">ویرایش شماره همراه</router-link>
            </div>

            <v-btn type="submit" class="my-6" height="40" text="تایید کد" variant="elevated" width="100%"
                color="#B0863B" :disabled="otp.length !== 4" :loading="loading"></v-btn>
            <div class="d-flex align-start">
                <v-btn variant="plain" class="resend-btn" :disabled="!canResend" @click="resendCode">
                    {{ canResend ? 'ارسال مجدد کد' : `تا دریافت مجدد کد تایید ${timer} ثانیه` }}
                </v-btn>
            </div>
            <p class="site-url">آدرس رسمی سامانه<span class="k-primary"> www.khanetala.ir </span>میباشد</p>
        </v-form>
    </v-card>

</template>

<script setup>
import router from '@/router';
import { ref, onMounted, onUnmounted } from 'vue';
import AuthService from '@/service/auth/auth';
import editIcon from '@/assets/images/icons/editIcon.vue'

const otp = ref('');
const loading = ref(false);
const isValid = ref(false);
const errorMsg = ref('');
const alertError = ref(false);
const timer = ref(120);
const canResend = ref(false);
const phoneNumber = ref('');
let countdown = null;



const submitOTP = async () => {
    try {
        loading.value = true;
        const response = await AuthService.VerifyOTP(otp.value);
        if (response.userVerificationStatus == "SUCCESS") {
            router.push('/');
        } else {
            router.push('/Identity');
        }
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


const resendCode = async () => {
    console.log(canResend.value)
    if (canResend.value == true) {
        try {
            phoneNumber.value = JSON.parse(localStorage.getItem('phoneNumber'))
            await AuthService.Login(phoneNumber.value);
            startTimer();
        } catch (error) {
            errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
            alertError.value = true;
            setTimeout(() => {
                alertError.value = false;
            }, 5000);
        }
    }
};

const startTimer = () => {
    canResend.value = false;
    timer.value = 120;
    countdown = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            clearInterval(countdown);
            canResend.value = true;
        }
    }, 1000);
};




onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(countdown);
});

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
}

.site-url {
    font-size: 12px;
    font-weight: 700;
    margin-top: 4rem;
}

.k-primary {
    color: #AE8A48;
}

.k-alert {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 12px;
    padding: 2px !important;
}

.login-link {
    text-align: right;
    color: #000;
    text-decoration: none;
    padding-right: 5px;
}

.otp-input {
    direction: ltr;
}

.resend-btn {
    color: #274BFF;
    text-decoration: underline;
    letter-spacing: 0 !important;
}
</style>