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
            <div class="step active">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">ثبت اطلاعات</p>
            </div>
            <div class="divider active"></div>
            <div class="step">
                <div>
                    <span class="circle">
                    </span>
                </div>
                <p class="mb-0">احراز هویت</p>
            </div>
        </div>
        <img src="/src/assets/logo.svg" alt="خانه طلا" class="my-5">
        <h3>احراز هویت</h3>
        <v-form ref="form" v-model="isValid" @submit.prevent="submitIdentity" class="auth-form">
            <v-sheet color="surface" class="mt-1">

                <v-text-field v-model="identityForm.nationalCode" type="text" label="کد ملی" variant="outlined"
                    class="k-textfield" :rules="rules.nationalCode" @input="validateForm"></v-text-field>

                <div class="d-flex mt-3">
                    <v-select v-model="selectedDate" label="روز" :items="persianDates" variant="outlined"
                        item-title="name" item-value="value" @update:model-value="onDateSelected" class="first-select"
                        :rules="[v => !!v || 'روز الزامی است']"></v-select>
                    <v-select v-model="selectedMonth" label="ماه" :items="persianMonths" variant="outlined"
                        class="second-select" item-title="name" item-value="value" @update:model-value="onMonthSelected"
                        :rules="[v => !!v || 'ماه الزامی است']"></v-select>
                    <v-select v-model="selectedYear" label="سال" :items="persianYears" variant="outlined"
                        class="third-select" item-title="name" item-value="value" @update:model-value="onYearSelected"
                        :rules="[v => !!v || 'سال الزامی است']"></v-select>
                </div>

            </v-sheet>

            <v-btn type="submit" class="my-6" height="40" text="بررسی احراز هویت" variant="elevated" width="100%"
                color="#B0863B" :disabled="!isValid" :loading="loading"></v-btn>
            <p class="site-url">آدرس رسمی سامانه<span class="k-primary"> www.khanetala.ir </span>میباشد</p>
        </v-form>
    </v-card>

</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import axios from 'axios';
import AuthService from '@/service/auth/auth';

const isValid = ref(false);
const errorMsg = ref('');
const alertError = ref(false);
const loading = ref(false);
const identityForm = ref({
    nationalCode: "",
    birthDate: "",
})

const selectedDate = ref();
const selectedMonth = ref();
const selectedYear = ref();

const persianDates = ref([
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "11", value: 11 },
    { name: "12", value: 12 },
    { name: "13", value: 13 },
    { name: "14", value: 14 },
    { name: "15", value: 15 },
    { name: "16", value: 16 },
    { name: "17", value: 17 },
    { name: "18", value: 18 },
    { name: "19", value: 19 },
    { name: "20", value: 20 },
    { name: "21", value: 21 },
    { name: "22", value: 22 },
    { name: "23", value: 23 },
    { name: "24", value: 24 },
    { name: "25", value: 25 },
    { name: "26", value: 26 },
    { name: "27", value: 27 },
    { name: "28", value: 28 },
    { name: "29", value: 29 },
    { name: "30", value: 30 },
    { name: "31", value: 31 },
]);

const persianMonths = ref([
    { name: "فروردین", value: 1 },
    { name: "اردیبهشت", value: 2 },
    { name: "خرداد", value: 3 },
    { name: "تیر", value: 4 },
    { name: "مرداد", value: 5 },
    { name: "شهریور", value: 6 },
    { name: "مهر", value: 7 },
    { name: "آبان", value: 8 },
    { name: "آذر", value: 9 },
    { name: "دی", value: 10 },
    { name: "بهمن", value: 11 },
    { name: "اسفند", value: 12 },
]);

const persianYears = ref([
    { name: "1300", value: 1300 },
    { name: "1301", value: 1301 },
    { name: "1302", value: 1302 },
    { name: "1303", value: 1303 },
    { name: "1304", value: 1304 },
    { name: "1305", value: 1305 },
    { name: "1306", value: 1306 },
    { name: "1307", value: 1307 },
    { name: "1308", value: 1308 },
    { name: "1309", value: 1309 },
    { name: "1310", value: 1310 },
    { name: "1311", value: 1311 },
    { name: "1312", value: 1312 },
    { name: "1313", value: 1313 },
    { name: "1314", value: 1314 },
    { name: "1315", value: 1315 },
    { name: "1316", value: 1316 },
    { name: "1317", value: 1317 },
    { name: "1318", value: 1318 },
    { name: "1319", value: 1319 },
    { name: "1320", value: 1320 },
    { name: "1321", value: 1321 },
    { name: "1322", value: 1322 },
    { name: "1323", value: 1323 },
    { name: "1324", value: 1324 },
    { name: "1325", value: 1325 },
    { name: "1326", value: 1326 },
    { name: "1327", value: 1327 },
    { name: "1328", value: 1328 },
    { name: "1329", value: 1329 },
    { name: "1330", value: 1330 },
    { name: "1331", value: 1331 },
    { name: "1332", value: 1332 },
    { name: "1333", value: 1333 },
    { name: "1334", value: 1334 },
    { name: "1335", value: 1335 },
    { name: "1336", value: 1336 },
    { name: "1337", value: 1337 },
    { name: "1338", value: 1338 },
    { name: "1339", value: 1339 },
    { name: "1340", value: 1340 },
    { name: "1341", value: 1341 },
    { name: "1342", value: 1342 },
    { name: "1343", value: 1343 },
    { name: "1344", value: 1344 },
    { name: "1345", value: 1345 },
    { name: "1346", value: 1346 },
    { name: "1347", value: 1347 },
    { name: "1348", value: 1348 },
    { name: "1349", value: 1349 },
    { name: "1350", value: 1350 },
    { name: "1351", value: 1351 },
    { name: "1352", value: 1352 },
    { name: "1353", value: 1353 },
    { name: "1354", value: 1354 },
    { name: "1355", value: 1355 },
    { name: "1356", value: 1356 },
    { name: "1357", value: 1357 },
    { name: "1358", value: 1358 },
    { name: "1359", value: 1359 },
    { name: "1360", value: 1360 },
    { name: "1361", value: 1361 },
    { name: "1362", value: 1362 },
    { name: "1363", value: 1363 },
    { name: "1364", value: 1364 },
    { name: "1365", value: 1365 },
    { name: "1366", value: 1366 },
    { name: "1367", value: 1367 },
    { name: "1368", value: 1368 },
    { name: "1369", value: 1369 },
    { name: "1370", value: 1370 },
    { name: "1371", value: 1371 },
    { name: "1372", value: 1372 },
    { name: "1373", value: 1373 },
    { name: "1374", value: 1374 },
    { name: "1375", value: 1375 },
    { name: "1376", value: 1376 },
    { name: "1377", value: 1377 },
    { name: "1378", value: 1378 },
    { name: "1379", value: 1379 },
    { name: "1380", value: 1380 },
    { name: "1381", value: 1381 },
    { name: "1382", value: 1382 },
    { name: "1383", value: 1383 },
    { name: "1384", value: 1384 },
    { name: "1385", value: 1385 },
    { name: "1386", value: 1386 },
    { name: "1387", value: 1387 },
    { name: "1388", value: 1388 },
    { name: "1389", value: 1389 },
    { name: "1390", value: 1390 },
    { name: "1391", value: 1391 },
    { name: "1392", value: 1392 },
    { name: "1393", value: 1393 },
    { name: "1394", value: 1394 },
    { name: "1395", value: 1395 },
    { name: "1396", value: 1396 },
    { name: "1397", value: 1397 },
    { name: "1398", value: 1398 },
    { name: "1399", value: 1399 },
    { name: "1400", value: 1400 },
    { name: "1401", value: 1401 },
    { name: "1402", value: 1402 },
    { name: "1403", value: 1403 }
]);


const rules = {
    nationalCode: [
        (v) => !!v || 'کد ملی الزامی است',
        (v) => /^\d{10}$/.test(v) || 'کد ملی باید ۱۰ رقم باشد',
        (v) => {
            if (!/^\d{10}$/.test(v)) return true;

            const check = +v[9];
            const sum = v.split('').slice(0, 9).reduce((acc, x, i) => acc + (+x * (10 - i)), 0) % 11;
            return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11) || 'کد ملی نامعتبر است';
        }
    ],
    birthDate: [
        () => {
            if (!selectedYear.value || !selectedMonth.value || !selectedDate.value) {
                return 'تاریخ تولد الزامی است';
            }
            return true;
        }
    ]
};


const validateForm = () => {
    identityForm.value.nationalCode = identityForm.value.nationalCode.replace(/\D/g, '').slice(0, 10);
    const isNationalCodeValid = rules.nationalCode.every(rule => rule(identityForm.value.nationalCode) === true);
    const isDateValid = selectedYear.value && selectedMonth.value && selectedDate.value;

    isValid.value = isNationalCodeValid && isDateValid;
    return isValid.value;
};


const onDateSelected = (value) => {
    selectedDate.value = value;
    updateBirthDate();
};

const onMonthSelected = (value) => {
    selectedMonth.value = value;
    updateBirthDate();
};

const onYearSelected = (value) => {
    selectedYear.value = value;
    updateBirthDate();
};

const updateBirthDate = () => {
    if (selectedYear.value && selectedMonth.value && selectedDate.value) {
        const month = String(selectedMonth.value).padStart(2, '0');
        const day = String(selectedDate.value).padStart(2, '0');
        identityForm.value.birthDate = `${selectedYear.value}${month}${day}`;
    }
    validateForm();
};


const submitIdentity = async () => {
    try {
        identityForm.value.phoneNumber = JSON.parse(localStorage.getItem('phoneNumber'));
        localStorage.setItem("identifyForm", JSON.stringify(identityForm.value))
        loading.value = true;
        const response = await AuthService.VerifyIdentity(identityForm.value);
        localStorage.setItem("userData", JSON.stringify(response.user))
        router.push('/IdentityInfo');
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

.first-select {
    margin-left: 0.5rem;
    font-size: 12px;
}

.second-select {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 12px;
}

.third-select {
    margin-right: 0.5rem;
    font-size: 12px;
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