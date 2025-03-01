<template>
    <div>
        <div class="d-flex flex-column align-center">
            <h3 class="title">خرید و فروش طلا</h3>
            <p class="subtitle">با خیال راحت در خانه طلا خرید و فروش کنید</p>
        </div>
        <v-card class="trade-card mt-3">
            <div class="d-md-none live-price-box">
                <div>
                    <span class="live-tag">live</span>
                    <span class="weight-tag">1 گرم</span>
                </div>
                <div>
                    <span class="my-2 live-price-text">قیمت لحظه ای طلا 18 عیار</span>
                    <span class="live-price">{{ formatNumber(goldPriceLive.buyPrice) }} ریال</span>
                </div>
            </div>
            <v-tabs v-model="tab" bg-color="white" class="tab-header">
                <v-tab value="one">خرید</v-tab>
                <v-tab value="two">فروش</v-tab>
                <v-tab value="three">انتقال</v-tab>
            </v-tabs>

            <v-card-text>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one">
                        <v-row>
                            <v-col cols="12" md="9" class="my-2">
                                <v-row>
                                    <v-col cols="12" md="6" class="my-2">
                                        <span>وزن طلا (گرم)</span>
                                        <v-text-field v-model="buyInfo.goldWeight" variant="outlined"
                                            color="rgba(135, 104, 36, 1)" density="compact"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" class="my-2">
                                        <span>مبلغ (ریال)</span>
                                        <v-text-field v-model="buyInfo.goldprice" variant="outlined"
                                            color="rgba(135, 104, 36, 1)" density="compact"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="my-2">
                                        <div class="d-flex justify-center">
                                            <v-btn color="rgba(135, 104, 36, 1)" class="trade-btn" :loading="loading"
                                                @click="CreateBuy">خرید</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col md="3" class="my-2 d-none d-md-flex">
                                <div class="price-live-card">
                                    <div class="d-flex justify-space-between my-2">
                                        <span class="price-change">{{ goldPriceLive.change }}</span>
                                        <span class="live-tag">live</span>
                                    </div>
                                    <span class="my-2 live-price-text">قیمت لحظه ای طلا 18 عیار</span>
                                    <div class="d-flex justify-space-between my-2">
                                        <span class="live-price">{{ formatNumber(goldPriceLive.buyPrice) }} ریال</span>
                                        <span class="weight-tag">1 گرم</span>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two">
                        <v-row>
                            <v-col cols="12" md="9" class="my-2">
                                <v-row>
                                    <v-col cols="12" md="6" class="my-2">
                                        <span>وزن طلا (گرم)</span>
                                        <v-text-field variant="outlined" color="rgba(135, 104, 36, 1)" density="compact"
                                            v-model="sellInfo.goldWeight" @input="goldConvertSell"
                                            :rules="weightRules"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" class="my-2">
                                        <span>مبلغ (ریال)</span>
                                        <v-text-field variant="outlined" color="rgba(135, 104, 36, 1)" density="compact"
                                            disabled>{{
                                                sellInfo.goldPrice
                                            }}</v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="my-2">
                                        <div class="d-flex justify-center">
                                            <v-btn color="rgba(135, 104, 36, 1)" class="trade-btn"
                                                :loading="sellLoading" @click="CreateSell">فروش</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col md="3" class="my-2 d-none d-md-flex">
                                <div class="price-live-card">
                                    <div class="d-flex justify-space-between my-2">
                                        <span class="price-change">{{ goldPriceLive.change }}</span>
                                        <span class="live-tag">live</span>
                                    </div>
                                    <span class="my-2 live-price-text">قیمت لحظه ای طلا 18 عیار</span>
                                    <div class="d-flex justify-space-between my-2">
                                        <v-progress-circular v-if="GoldPriceLoading" :size="10" color="#fff"
                                            indeterminate></v-progress-circular>
                                        <span class="live-price" v-else>{{ formatNumber(goldPriceLive.buyPrice) }}
                                            ریال</span>
                                        <span class="weight-tag">1 گرم</span>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="three">
                        به زودی ...
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>
        </v-card>
        <h3 class="title">تاریخچه تراکنش ها</h3>
        <div class="trade-history">
            <div class="d-flex justify-space-between">
                <v-tabs v-model="historyTab" bg-color="white">
                    <v-tab value="one">خرید</v-tab>
                    <v-tab value="two">فروش</v-tab>
                    <v-tab value="three">انتقال</v-tab>
                </v-tabs>
                <v-combobox label="وضعیت پرداخت" :items="filter" item-title="text" item-value="value"
                    density="comfortable" variant="solo" class="transaction-filter"
                    @update:modelValue="filterChange"></v-combobox>
            </div>
            <v-tabs-window v-model="historyTab">
                <v-tabs-window-item value="one" class="transaction-box">
                    <div class="d-flex justify-end">

                    </div>
                    <v-data-table :headers="Transactionheaders" :items="BuyTransactionItems"
                        :loading="TransactionLoading" class="transaction-table">
                        <template v-slot:item.status="{ item }">
                            <div class="">
                                <v-chip
                                    :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'نامشخص' : 'ناموفق'"
                                    :color="item.status == 'completed' ? 'green' : (item.status) == 'pending' ? '#666666' : 'red'"
                                    size="small"></v-chip>
                            </div>
                        </template>
                        <template v-slot:item.goldPrice="{ item }">
                            <p>{{ formatNumber(item.goldPrice) }}</p>
                        </template>
                        <template v-slot:item.totalPrice="{ item }">
                            <p>{{ formatNumber(item.totalPrice) }}</p>
                        </template>
                    </v-data-table>
                </v-tabs-window-item>

                <v-tabs-window-item value="two" class="transaction-box">
                    <v-data-table :headers="Transactionheaders" :items="SellTransactionItems"
                        :loading="TransactionLoading" class="transaction-table">
                        <template v-slot:item.status="{ item }">
                            <div class="">
                                <v-chip
                                    :text="item.status == 'completed' ? 'موفق' : (item.status) == 'pending' ? 'نامشخص' : 'ناموفق'"
                                    :color="item.status == 'completed' ? 'green' : (item.status) == 'pending' ? '#666666' : 'red'"
                                    size="small"></v-chip>
                            </div>
                        </template>
                        <template v-slot:item.goldPrice="{ item }">
                            <p>{{ formatNumber(item.goldPrice) }}</p>
                        </template>
                        <template v-slot:item.totalPrice="{ item }">
                            <p>{{ formatNumber(item.totalPrice) }}</p>
                        </template>
                    </v-data-table>
                </v-tabs-window-item>

                <v-tabs-window-item value="three">
                    به زودی ...
                </v-tabs-window-item>
            </v-tabs-window>
        </div>

        <v-dialog max-width="500" v-model="buyModal">
            <v-card>
                <div class="buyModal-content py-10">
                    <h3>فاکتور خرید</h3>
                    <div class="wallet-badge my-2">
                        <span class="pe-6">موجودی کیف پول</span>
                        <span>{{ paymentInfo.balance }} ریال</span>
                    </div>
                    <div class="d-flex justify-space-evenly align-center w-100 my-2 k-text">
                        <p class="pe-6">مقدار طلا</p>
                        <p>{{ buyInfo.goldWeight }} گرم</p>
                    </div>
                    <div class="d-flex justify-space-evenly align-center w-100 my-2 k-text">
                        <p class="pe-6">مبلغ</p>
                        <p>{{ buyInfo.goldprice }} ریال</p>
                    </div>
                    <div class="d-flex justify-space-evenly align-center w-100 my-2">
                        <span class="fee">کارمزد 0 درصد</span>
                        <div class="d-flex">
                            <span>{{ timer }}</span>
                            <TimerIcon />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-space-around my-2">
                    <v-btn text="پرداخت مستقیم" class="pay-btn" color="#9D7E3B" @click="CompleteBuy('direct')"></v-btn>
                    <v-btn text="پرداخت از کیف پول" class="pay-btn" color="#9D7E3B" variant="outlined"
                        @click="CompleteBuy('wallet')"></v-btn>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog max-width="500" v-model="sellModal">
            <v-card>
                <div class="buyModal-content py-10">
                    <h3>فاکتور فروش</h3>
                    <div class="wallet-badge my-2">
                        <span class="pe-6">موجودی کیف پول</span>
                        <span>{{ paymentSellInfo.goldWeight }} گرم</span>
                    </div>
                    <div class="d-flex justify-space-evenly align-center w-100 my-2 k-text">
                        <p class="pe-6">مقدار طلا</p>
                        <p>{{ sellInfo.goldWeight }} گرم</p>
                    </div>
                    <div class="d-flex justify-space-evenly align-center w-100 my-2 k-text">
                        <p class="pe-6">مبلغ</p>
                        <p>{{ sellInfo.goldPrice }} ریال</p>
                    </div>
                    <div class="d-flex justify-space-evenly align-center w-100 my-2">
                        <span class="fee">کارمزد 1 درصد</span>
                        <div class="d-flex">
                            <span>{{ timer }}</span>
                            <TimerIcon />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-space-around my-2">
                    <v-btn text="تایید فروش" class="pay-btn" color="#9D7E3B" @click="CompleteSell()"></v-btn>
                </div>
            </v-card>
        </v-dialog>


        <v-alert v-if="alertError" color="error" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ errorMsg }}
        </v-alert>

        <v-alert v-if="alertSuccess" color="success" border="bottom" elevation="2" class="k-alert alert-animatiton"
            closable>
            {{ successMsg }}
        </v-alert>
    </div>
</template>

<script setup>
import PriceService from '@/service/auth/price';
import TradeService from '@/service/auth/trade';
import TimerIcon from '@/assets/images/icons/TimerIcon.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { useRoute } from "vue-router";
import router from '@/router';


const route = useRoute();


const tab = ref(null);
const loading = ref(false);
const sellLoading = ref(false);
const GoldPriceLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('')
const alertError = ref(false);
const alertSuccess = ref(false);
const buyModal = ref(false);
const sellModal = ref(false);
const historyTab = ref(null);
const goldPriceLive = ref({
    sellPrice: '',
    buyPrice: '',
    change: '',
})
const timer = ref(30);
const TransactionLoading = ref(false);
const SellTransactionItems = ref();
const BuyTransactionItems = ref();
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
        title: 'وزن طلا(گرم)',
        key: 'goldWeight',
    },
    {
        title: 'قیمت نهایی',
        key: 'totalPrice',
    },
    {
        title: 'قیمت طلا در لحظه',
        key: 'goldPrice',
    },
    {
        title: 'وضعیت',
        key: 'status',
    },
]);
const filter = ref([
    {
        text: 'موفق',
        value: 'success',
    },
    {
        text: 'ناموفق',
        value: 'failed',
    },
    {
        text: 'نامشخص',
        value: 'pending',
    },
    {
        text: 'همه',
        value: '',
    },
])
let interval = ref(null);
const invoice = ref({
    invoiceId: '',
    paymentUrl: '',
})
const buyInfo = ref({
    goldprice: '',
    goldWeight: '',
});
const sellInfo = ref({
    goldPrice: '',
    goldWeight: '',
})
const paymentInfo = ref({
    invoiceId: '',
    amount: '',
    isFromWallet: '',
    balance: 0,
});

const paymentSellInfo = ref({
    invoiceId: '',
    amount: '',
    isFromWallet: '',
    balance: 0,
    goldWeight: 0,
});

const payInfo = ref({
    type: '',
    totalPrice: '',
    goldPrice: '',
    goldWeight: '',
});
const paySellInfo = ref({
    type: '',
    totalPrice: '',
    goldPrice: '',
    goldWeight: '',
});

const filterTransaction = ref({
    status: '',
});

const verifyDetail = ref({})

const weightRules = [
    (v) => !!v || 'مقدار نمی‌تواند خالی باشد',
    (v) => /^\d+(\.\d{1,2})?$/.test(v) || 'مقدار میتواند تا 2 رقم اعشار باشد '
];

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
}


// const goldConvert = () => {
//     buyInfo.value.goldprice = buyInfo.value.goldWeight * goldPriceLive.value.buyPrice;
// }


watch(
    () => [buyInfo.value.goldWeight, buyInfo.value.goldprice],
    ([newWeight, newPrice], [oldWeight, oldPrice]) => {
        // تبدیل مقادیر خالی به 0
        const weight = newWeight === '' ? 0 : parseFloat(newWeight);
        const price = newPrice === '' ? 0 : parseFloat(newPrice);

        if (newWeight !== oldWeight) {
            buyInfo.value.goldprice = weight * goldPriceLive.value.buyPrice;
        } else if (newPrice !== oldPrice) {
            if (price < 100000) {
                buyInfo.value.goldWeight = 0;
            } else {
                buyInfo.value.goldWeight = price / goldPriceLive.value.buyPrice;
            }
        }
    }
);


const goldConvertSell = () => {
    sellInfo.value.goldPrice = sellInfo.value.goldWeight * goldPriceLive.value.sellPrice;
}


const CreateBuy = async () => {
    try {
        loading.value = true;
        payInfo.value.type = "buy";
        payInfo.value.totalPrice = buyInfo.value.goldprice;
        payInfo.value.goldWeight = buyInfo.value.goldWeight;
        payInfo.value.goldPrice = goldPriceLive.value.buyPrice;
        console.log(payInfo)
        const response = await TradeService.createInvoice(payInfo.value);
        paymentInfo.value.invoiceId = response.transactionId;
        paymentInfo.value.balance = response.wallet.balance;
        buyModal.value = true;
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


const CompleteBuy = async (paymentMethod) => {
    try {
        loading.value = true;
        if (paymentMethod == 'wallet') {
            paymentInfo.value.isFromWallet = true;
        } else {
            paymentInfo.value.isFromWallet = false;
        }
        paymentInfo.value.amount = buyInfo.value.goldprice;
        const response = await TradeService.complateTransaction(paymentInfo.value);
        if (response.isFromWallet == true) {
            buyModal.value = false;
            router.push('./')
        } else {
            invoice.value.paymentUrl = response.paymentUrl;
            invoice.value.invoiceId = response.invoiceId;
            window.location.href = invoice.value.paymentUrl;
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
        Transaction()
    }
}

const CreateSell = async () => {
    try {
        sellLoading.value = true;
        paySellInfo.value.type = "sell";
        paySellInfo.value.totalPrice = sellInfo.value.goldPrice;
        paySellInfo.value.goldWeight = sellInfo.value.goldWeight;
        paySellInfo.value.goldPrice = goldPriceLive.value.sellPrice;
        const response = await TradeService.createSellInvoice(paySellInfo.value);
        paymentSellInfo.value.invoiceId = response.transactionId;
        paymentSellInfo.value.balance = response.wallet.balance;
        paymentSellInfo.value.goldWeight = response.wallet.goldWeight;
        sellModal.value = true;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 5000)
    } finally {
        sellLoading.value = false;
    }
}

const CompleteSell = async () => {
    try {
        sellLoading.value = true;
        paymentSellInfo.value.amount = sellInfo.value.goldPrice;
        paymentSellInfo.value.fee = 1
        const response = await TradeService.complateSellTransaction(paymentSellInfo.value);
        sellModal.value = false;
        successMsg.value = 'طلای شما با موفقیت به فروش رسید';
        alertSuccess.value = true;
        setTimeout(() => {
            alertSuccess.value = false;
        }, 5000)
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 5000)
    } finally {
        sellLoading.value = false;
        Transaction()
    }
}

const filterChange = (filterValue) => {
    filterTransaction.value.status = filterValue.value;
    sellTransaction();
    buyTransaction();
}

const sellTransaction = async () => {
    try {
        TransactionLoading.value = true;
        const response = await TradeService.GoldBoxSellTransactions(filterTransaction.value);
        SellTransactionItems.value = response;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        TransactionLoading.value = false;
    }
}

const buyTransaction = async () => {
    try {
        TransactionLoading.value = true;
        const response = await TradeService.GoldBoxBuyTransactions(filterTransaction.value);
        BuyTransactionItems.value = response;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    } finally {
        TransactionLoading.value = false;
    }
}


const VerifyTransaction = async (zarinpal) => {
    try {
        const response = await TradeService.VerifyTransaction(zarinpal);
        console.log(response);
        verifyDetail.value = response;
        return response
    } catch (error) {
        errorMsg.value = error.response.data.msg || 'خطایی رخ داده است!';
        alertError.value = true;
        setTimeout(() => {
            alertError.value = false;
        }, 10000)
    }
}


onMounted(() => {
    GetGoldPrice();
    buyTransaction();
    sellTransaction();
    setInterval(() => {
        GetGoldPrice();
    }, 30000);


    const zarinpal = ref({
        authority: route.query.Authority,
        status: route.query.Status,
    })



    if (zarinpal.value.authority && zarinpal.value.status) {
        VerifyTransaction(zarinpal.value);
        if (zarinpal.value.status === "OK") {
            router.push({ name: 'success', query: verifyDetail.value });
        } else {
            router.push({ name: 'failed', query: verifyDetail.value });
        }
    }
})


// watch(buyInfo.value, () => {
//     goldConvert();
// })

watch(goldPriceLive.value, () => {
    console.log('price changed')
})


watch(buyModal, (newVal) => {
    if (newVal) {
        timer.value = 30;
        startTimer();
    } else {
        stopTimer();
    }
});

watch(sellModal, (newVal) => {
    if (newVal) {
        timer.value = 30;
        startTimer();
    } else {
        stopTimer();
    }
});

const startTimer = () => {
    stopTimer();
    interval = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            stopTimer();
            buyModal.value = false;
            sellModal.value = false;
        }
    }, 1000);
};

const stopTimer = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
};

onUnmounted(() => {
    stopTimer();
});

</script>

<style scoped>
.title {
    font-size: 36px;
    font-weight: 700;
    color: rgba(0, 96, 58, 1);
    text-align: center;
    margin-top: 2rem;
}

.subtitle {
    font-size: 24px;
    font-weight: 300;
    color: rgba(0, 96, 58, 1);
    margin: 0.8rem 0;
    text-align: center;
}

.trade-card {
    box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4) !important;
    backdrop-filter: blur(12px) !important;
    border-radius: 16px;
}

.trade-card button {
    letter-spacing: 0 !important;
}

.price-change {
    color: red;
}

.trade-btn {
    min-width: 10rem;
}

.price-live-card {
    box-shadow: -2px -2px 12px 0px rgba(217, 198, 166, 0.3);
    border-radius: 16px;
    padding: 24px;
    margin: 0 0.5rem;
    display: flex;
    flex-direction: column;
}

.live-tag {
    background-color: rgba(147, 6, 6, 1);
    color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(154, 154, 154, 0.62);
    border-radius: 12px;
    font-size: 14px;
    padding: 5px 10px;
}

.weight-tag {
    background-color: rgba(135, 104, 36, 1);
    color: #fff;
    box-shadow: 0px 2px 4px 0px rgba(230, 219, 197, 1);
    border-radius: 12px;
    font-size: 14px;
    padding: 5px 10px;
}

.live-price-text {
    font-size: 18px;
    font-weight: 400;
}

.live-price {
    font-size: 22px;
    font-weight: 400;
}

.trade-history {
    margin-top: 1rem;
    background-color: #fff;
    box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 24px;
}

.buyModal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wallet-badge {
    background-color: rgba(56, 120, 93, 1);
    color: #fff;
    border-radius: 8px;
    padding: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
}

.buyModal-content h3 {
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 2rem;
}

.buyModal-content .k-text {
    font-size: 22px;
    font-weight: 400;
}

.pay-btn {
    width: 40%;
    display: flex;
}

.fee {
    font-size: 12px;
    font-weight: 700;
    color: #00603A;
}

.fee span {
    font-size: 14px;
    font-weight: 400;
}

.live-price-box {
    box-shadow: -2px -2px 20px 0px rgba(217, 198, 166, 0.4);
    padding: 12px 24px;
    margin: 1.5rem;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
}

.live-price-box>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;
}

.live-price-box .live-tag {
    font-size: 12px;
    padding: 2px 8px;
}

.live-price-box .weight-tag {
    font-size: 12px;
    padding: 2px 8px;
}

.live-price-box .live-price {
    font-size: 14px;
}

.live-price-box .live-price-text {
    font-size: 14px;
}

.k-alert {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 12px;
    padding: 2px !important;
}

.tab-header button {
    padding: 0 1.5rem;
    letter-spacing: 0 !important;
    border-radius: 0 !important;
    font-size: 18px !important;
}

@media(min-width:768px) {
    .tab-header button {
        padding: 0 3rem;
    }
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

.transaction-filter {
    max-width: 15rem;
}
</style>