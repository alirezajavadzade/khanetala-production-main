<template>
    <div>

        <v-row class="mt-5">
            <v-col cols="12" md="6">
                <div class="d-card asset">
                    <div class="d-flex justify-space-between align-center w-100">
                        <p class="text">موجودی کیف پول ریالی : </p>
                        <div class="d-flex flex-column justify-space-between h-100 align-end">
                            <v-progress-circular v-if="walletLoading" :size="10" color="#fff"
                                indeterminate></v-progress-circular>
                            <p class="price my-1" v-else>{{ formatNumber(wallet.balance) }} ریال</p>
                            <v-progress-circular v-if="walletLoading" :size="10" color="#fff"
                                indeterminate></v-progress-circular>
                            <p class="gold-price my-1" v-else>معادل {{ (wallet.balance /
                                goldPriceLive.buyPrice).toFixed(2) }} گرم
                                طلا</p>
                        </div>
                    </div>
                    <div class="action">
                        <v-btn variant="flat" color="#00603A" class="wallet-btn" @click="depositDialog = true">شارژ کیف
                            پول</v-btn>
                        <v-btn variant="outlined" color="#00603A" class="wallet-btn"
                            @click="withdrawDialog = true">برداشت</v-btn>
                    </div>
                </div>
            </v-col>

            <v-col cols="12" md="6">
                <div class="d-flex flex-column h-100 w-100">
                    <div class="asset-card mb-3">
                        <p class="text">موجودی صندوق طلا : </p>
                        <div class="d-flex flex-column justify-space-between h-100 align-end">
                            <v-progress-circular v-if="walletLoading" :size="10" color="#fff"
                                indeterminate></v-progress-circular>
                            <p class="gold-weight my-1" v-else>{{ wallet.goldWeight }} گرم</p>
                            <v-progress-circular v-if="walletLoading" :size="10" color="#fff"
                                indeterminate></v-progress-circular>
                            <p class="gold-price my-1" v-else>معادل {{ formatNumber(wallet.goldWeight *
                                goldPriceLive.buyPrice) }}ریال</p>
                        </div>
                    </div>
                    <div class="amount-card">
                        <div class="d-flex justify-space-between">
                            <p class="text">دارایی کل</p>
                            <v-progress-circular v-if="walletLoading" :size="10" color="#fff"
                                indeterminate></v-progress-circular>


                            <!-- <p class="price my-1" v-else>{{ parseInt((wallet.goldWeight * goldPriceLive.buyPrice) +
                            (wallet.balance))
                            }} ریال
                        </p> -->

                            <p class="price my-1" v-else>{{ formatNumber(wallet.TotalAssets) }} ریال</p>
                        </div>
                        <div class="d-flex justify-space-between mt-2">
                            <p class="text">در انتظار پرداخت</p>
                            <v-progress-circular v-if="walletLoading" :size="10" color="#fff"
                                indeterminate></v-progress-circular>


                            <!-- <p class="price my-1" v-else>{{ parseInt((wallet.goldWeight * goldPriceLive.buyPrice) +
                            (wallet.balance))
                            }} ریال
                        </p> -->

                            <p class="price my-1" v-else>{{ formatNumber(wallet.blocked) }} ریال</p>
                        </div>
                    </div>
                </div>
            </v-col>



            <v-col cols="12">
                <h3 class="transaction-title">تاریخچه تراکنش ها</h3>
                <div class="trade-history">
                    <div class="d-flex justify-space-between">
                        <v-tabs v-model="historyTab" bg-color="white">
                            <v-tab value="one">واریز</v-tab>
                            <v-tab value="two">برداشت</v-tab>
                        </v-tabs>
                        <v-combobox label="وضعیت پرداخت" :items="filter" item-title="text" item-value="value"
                            density="comfortable" variant="solo" class="transaction-filter"
                            @update:modelValue="filterChange"></v-combobox>
                    </div>
                    <v-tabs-window v-model="historyTab">
                        <v-tabs-window-item value="one" class="transaction-box">
                            <div class="d-flex justify-end">

                            </div>
                            <v-data-table :headers="Transactionheaders" :items="DepositeTransactionItems"
                                :loading="TransactionLoading" class="transaction-table">
                                <template v-slot:item.status="{ item }">
                                    <div class="">
                                        <v-chip
                                            :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'نامشخص' : 'ناموفق'"
                                            :color="item.status == 'completed' ? 'green' : (item.status) == 'pending' ? '#666666' : 'red'"
                                            size="small"></v-chip>
                                    </div>
                                </template>
                                <template v-slot:item.amount="{ item }">
                                    <p>{{ formatNumber(item.amount) }}</p>
                                </template>
                            </v-data-table>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="two" class="transaction-box">
                            <v-data-table :headers="Transactionheaders" :items="WithdrawTransactionItems"
                                :loading="TransactionLoading" class="transaction-table">
                                <template v-slot:item.status="{ item }">
                                    <div class="">
                                        <v-chip
                                            :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'در انتظار' : 'ناموفق'"
                                            :color="item.status == 'completed' ? 'green' : (item.status) == 'pending' ? '#666666' : 'red'"
                                            size="small"></v-chip>
                                    </div>
                                </template>
                                <template v-slot:item.amount="{ item }">
                                    <p>{{ formatNumber(item.amount) }}</p>
                                </template>
                            </v-data-table>
                        </v-tabs-window-item>

                    </v-tabs-window>
                </div>
            </v-col>
        </v-row>




        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>

        <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ successMsg }}
        </v-alert>


        <v-dialog v-model="depositDialog" width="auto">
            <v-card min-width="350" max-width="400" class="cart-Dialog">
                <div class="my-1">
                    <p>مبلغ مورد نظر را جهت واریز وارد نمایید</p>
                </div>
                <v-form ref="form" v-model="isValidcharge" @submit.prevent="deposit">
                    <v-text-field v-model="priceAmount" variant="outlined" color="rgba(135, 104, 36, 1)"
                        density="compact" label="مبلغ (ریال)" class="mb-0 mt-2" :rules="validatePrice"
                        @input="limitInput"></v-text-field>
                    <div v-if="priceAmount">
                        <p class="amount-word">{{ DepositeAmountInWords }}</p>
                    </div>
                    <div class="title my-2">
                        <InfoIcon />
                        <p>حداقل مبلغ شارژ باید 100,000 تومان باشد</p>
                    </div>
                    <v-btn type="submit" text="شارژ حساب" block color="#9D7E3B" variant="flat" class="submit-cart-btn"
                        :disabled="!isValidcharge" :loading="depositLoading"></v-btn>
                </v-form>
            </v-card>
        </v-dialog>


        <v-dialog v-model="withdrawDialog" width="auto">
            <v-card min-width="350" max-width="400" class="cart-Dialog">
                <div class="title my-1">
                    <p>مبلغ مورد نظر را جهت برداشت وارد نمایید</p>
                </div>
                <v-form ref="form" v-model="isValidPrice" @submit.prevent="withdraw">
                    <v-text-field v-model="withdrawAmount" variant="outlined" color="rgba(135, 104, 36, 1)"
                        density="compact" label="مبلغ (ریال)" class="mb-0 mt-2" :rules="validatePrice"
                        @input="limitWithdrawInput"></v-text-field>
                    <div v-if="withdrawAmount">
                        <p class="amount-word">{{ amountInWords }}</p>
                    </div>
                    <v-btn type="submit" text="برداشت از حساب" block color="#9D7E3B" variant="flat"
                        class="submit-cart-btn" :disabled="!isValidPrice" :loading="withdrawLoading"></v-btn>
                </v-form>
            </v-card>
        </v-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import AuthService from '@/service/auth/auth';
import PriceService from '@/service/auth/price';
import TradeService from '@/service/auth/trade';
import { useRoute } from "vue-router";
import router from '@/router';
import { numberToWords } from '@persian-tools/persian-tools';
import InfoIcon from '@/assets/images/icons/InfoIcon.vue';


const route = useRoute();

const errorMsg = ref('');
const alertError = ref(false);
const alertSuccess = ref(false);
const historyTab = ref(null);
const TransactionLoading = ref(false);
const DepositeTransactionItems = ref();
const WithdrawTransactionItems = ref();
const walletLoading = ref(false);
const GoldPriceLoading = ref(false);
const withdrawLoading = ref(false);
const depositDialog = ref(false);
const withdrawDialog = ref(false);
const priceAmount = ref('');
const withdrawAmount = ref('');
const isValidPrice = ref('');
const depositLoading = ref(false);
const successMsg = ref('')
const filter = ref([
    {
        text: 'همه',
        value: '',
    },
    {
        text: 'موفق',
        value: 'completed',
    },
    {
        text: 'ناموفق',
        value: 'failed',
    },
    {
        text: 'نامشخص',
        value: 'pending',
    },
]);
const Transactionheaders = ref([
    {
        title: 'تاریخ',
        key: 'date',
    },
    {
        title: 'زمان',
        key: 'time',
    },
    {
        title: 'مقدار(ریال)',
        key: 'amount',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
]);
const wallet = ref({
    balance: 0,
    goldWeight: 0,
    goldprice: 0,
    TotalAssets: 0,
    blocked: 0
});

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const goldPriceLive = ref({
    sellPrice: '',
    buyPrice: '',
    change: '',
});

const filterTransaction = ref({
    type: '',
    status: '',
});

const paymentUrl = ref('');

const verifyDetail = ref({});


const GetWallet = async () => {
    try {
        walletLoading.value = true;
        const response = await AuthService.Wallet();
        wallet.value.balance = response.balance;
        wallet.value.goldWeight = response.goldWeight;
        wallet.value.TotalAssets = response.totalAssets;
        wallet.value.blocked = response.blocked;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        walletLoading.value = false;
    }
};

const GetGoldPrice = async () => {
    try {
        GoldPriceLoading.value = true;
        const response = await PriceService.GoldPrice();
        goldPriceLive.value.buyPrice = response.buyPrice;
        goldPriceLive.value.sellPrice = response.sellPrice;
        goldPriceLive.value.change = response.change;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        GoldPriceLoading.value = false;
    }
};


const deposit = async () => {
    try {
        const response = await TradeService.DepositWallet(priceAmount.value.replaceAll(',', ''));
        paymentUrl.value = response.url;
        window.location.href = paymentUrl.value;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {

    }
};


const VerifyDeposit = async (zarinpal) => {
    try {
        const response = await TradeService.VerifyDepositWallet(zarinpal);
        console.log(response);
        verifyDetail.value = response;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {

    }
};


const withdraw = async () => {
    try {
        withdrawLoading.value = true;
        const response = await TradeService.WithdrawWallet(withdrawAmount.value.replaceAll(',', ''));
        withdrawDialog.value = false;
        successMsg.value = `مبلغ ${withdrawAmount.value} پس از تایید کارشناس به حساب شما واریز خواهد شد.`;
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        GetWallet();
        withdrawTransaction();
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        withdrawLoading.value = false;
    }
};


const validatePrice = [
    (v) => !!v || 'مقدار ورودی نمی‌تواند خالی باشد',
    (v) => /^\d+$/.test(v.replace(/,/g, '')) || 'فقط عدد مجاز است',
];


const isValidcharge = computed(() => {
    const amount = parseFloat(priceAmount.value.replace(/,/g, ''));
    return amount >= 1000000;
});


const limitInput = () => {
    priceAmount.value = priceAmount.value.replace(/\D/g, '');
    if (priceAmount.value.length > 10) {
        priceAmount.value = priceAmount.value.slice(0, 11);
    }
    priceAmount.value = formatNumberWithCommas(priceAmount.value);
};

const limitWithdrawInput = () => {
    withdrawAmount.value = withdrawAmount.value.replace(/\D/g, '');
    if (withdrawAmount.value.length > 10) {
        withdrawAmount.value = withdrawAmount.value.slice(0, 11);
    }
    withdrawAmount.value = formatNumberWithCommas(withdrawAmount.value);
};

const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


const depositTransaction = async () => {
    try {
        filterTransaction.value.type = 'deposit';
        TransactionLoading.value = true;
        const response = await TradeService.WalletTransaction(filterTransaction.value);
        DepositeTransactionItems.value = response;
        return response
    } catch (error) {
        console.log(error)
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        TransactionLoading.value = false;
    }
};

const withdrawTransaction = async () => {
    try {
        filterTransaction.value.type = 'withdraw';
        TransactionLoading.value = true;
        const response = await TradeService.WalletTransaction(filterTransaction.value);
        WithdrawTransactionItems.value = response;
        return response
    } catch (error) {
        console.log(error)
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        TransactionLoading.value = false;
    }
};

const filterChange = (filterValue) => {
    filterTransaction.value.status = filterValue.value;
    depositTransaction();
    withdrawTransaction();
};

const amountInWords = computed(() => {
    if (withdrawAmount.value) {
        const amountWithoutCommas = withdrawAmount.value.replace(/,/g, '');
        const amountInRial = parseInt(amountWithoutCommas, 10);
        const amountInToman = amountInRial / 10;

        if (amountInToman < 1) {
            return 'کمتر از یک تومان';
        }

        return numberToWords(Math.floor(amountInToman)) + ' تومان';
    }
    return '';
});


const DepositeAmountInWords = computed(() => {
    if (priceAmount.value) {
        const amountWithoutCommas = priceAmount.value.replace(/,/g, '');
        const amountInRial = parseInt(amountWithoutCommas, 10);
        const amountInToman = amountInRial / 10;
        if (amountInToman < 1) {
            return 'کمتر از یک تومان';
        }

        return numberToWords(Math.floor(amountInToman)) + ' تومان';
    }
    return '';
});


watch(withdrawDialog, (newValue) => {
    if (!newValue) {
        withdrawAmount.value = '';
    }
});


watch(depositDialog, (newValue) => {
    if (!newValue) {
        priceAmount.value = '';
    }
});



onMounted(() => {
    GetWallet();
    GetGoldPrice();
    depositTransaction();
    withdrawTransaction();


    const zarinpal = ref({
        authority: route.query.Authority,
        status: route.query.Status,
    });
    if (zarinpal.value.authority && zarinpal.value.status) {
        VerifyDeposit(zarinpal.value)
        if (zarinpal.value.status === "OK") {
            router.push({ name: 'success', query: verifyDetail.value });
        } else {
            router.push({ name: 'failed', query: verifyDetail.value });
        }
    }
});
</script>

<style scoped>
.k-alert {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    padding: 2px !important;
}

.transaction-box {
    padding: 2rem 1rem;
}

.transaction-table {
    box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid #009358;
}

.d-card {
    padding: 12px 24px;
    border-radius: 16px;
    background-color: rgba(254, 253, 251, 0.6);
    box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 12rem;
    width: 100%;
}

.d-card .title {
    width: 100%;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    justify-content: flex-start;
}

.d-card .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
}

.d-card .content p {
    font-size: 22px;
    font-weight: 700;
}

.d-card .content span {
    box-shadow: 0px 2px 4px 0px rgba(230, 219, 197, 1);
    color: #fff;
    background: #876824;
    font-size: 12px;
    font-weight: 700;
    border-radius: 12px;
    padding: 4px 6px;
}

.d-card .action {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.k-btn {
    padding: 0.5rem 4rem;
    border-radius: 8px;
    background: #00603A;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
}

.k-btn:hover {
    background: #017245;
}

.k-btn:active {
    background: #02834f;
}


.k-btn-second {
    padding: 0.5rem 4rem;
    border-radius: 8px;
    background: #fff;
    color: #017245;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #017245;
}

.k-btn-second:hover {
    background: #f0fff9;
}

.k-btn-second:active {
    background: #d9f9ec;
}

.wallet-btn {
    letter-spacing: 0 !important;
    width: 45%;
}

.transaction-title {
    font-size: 28px;
    font-weight: 700;
    color: #00603A;
    margin: 3rem;
    text-align: center;
}

.price-amount {
    min-width: 250px;
    margin: 1rem 3rem;
}

.asset {
    height: 100%;
}

.asset .text {
    color: #00603A;
    font-size: 20px;
}

.asset .price {
    color: #00603A;
    font-size: 20px;
    font-weight: 400;
}

.asset .gold-price {
    color: #00603A;
    font-size: 14px;
}

.asset-card {
    box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
    backdrop-filter: blur(12px);
    padding: 12px 24px;
    border-radius: 16px;
    background-color: rgba(254, 253, 251, 0.6);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.amount-card {
    box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
    backdrop-filter: blur(12px);
    padding: 12px 24px;
    border-radius: 16px;
    background-color: rgba(254, 253, 251, 0.6);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.asset-card {
    color: rgba(60, 60, 60, 1);
    font-weight: 400;
}

.cart-Dialog {
    border-radius: 16px !important;
    padding: 2rem;
}

.cart-Dialog .title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffe7e7;
    color: #ff0000;
    padding: 0.4rem 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
}

.cart-Dialog .title p {
    margin: 0 0.3rem;
    font-size: 12px;
}

.cart-Dialog svg {
    filter: invert(19%) sepia(88%) saturate(7474%) hue-rotate(358deg) brightness(94%) contrast(109%);
}

.submit-cart-btn {
    height: 2.6rem !important;
}

.transaction-filter {
    max-width: 15rem;
}

.amount-word {
    font-size: 12px;
    color: #b00020;
    padding-bottom: 0.5rem;
}
</style>