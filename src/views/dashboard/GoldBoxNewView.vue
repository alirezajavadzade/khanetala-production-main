<template>
  <div>
    <v-container class="px-0" fluid>
      <v-row class="my-1">
        <v-col cols="12">
          <div class="d-flex flex-column align-center">
            <h3 class="title">خرید و فروش طلا</h3>
            <!-- <p class="subtitle">با خیال راحت در خانه طلا خرید و فروش کنید</p> -->
          </div>
        </v-col>
        <v-col cols="12">
          <v-tabs v-model="tab" bg-color="white" class="tab-header">
            <v-tab value="one">خرید</v-tab>
            <v-tab value="two">فروش</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-tabs-window v-model="tab" class="my-1">
        <v-tabs-window-item value="one">
          <v-container>
            <v-row>
              <v-col cols="12" md="7" class="pa-0 my-2">
                <div class="goldbox-section buy me-2">
                  <div class="live-price-box">
                    <span class="live-tag">لحظه ای</span>
                    <p>قیمت طلای 18 عیار:</p>
                    <p class="fade-badge">
                      {{ formatNumber(goldPriceLive.buyPrice) }} تومان
                    </p>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-3': isSwapped, 'order-1': !isSwapped }"
                  >
                    <span>وزن طلا (گرم)</span>
                    <v-text-field
                      v-model="buyInfo.goldWeight"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="buyGoldweightConvert"
                      :rules="validateWeight"
                      class="transition-field"
                    ></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center order-2">
                    <v-btn
                      icon="mdi-swap-horizontal"
                      variant="text"
                      class="change-btn"
                      @click="swapFields"
                    ></v-btn>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-1': isSwapped, 'order-3': !isSwapped }"
                  >
                    <span>مبلغ (تومان)</span>
                    <v-text-field
                      v-model="buyInfo.goldprice"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="buyGoldpriceConvert"
                      class="transition-field"
                    ></v-text-field>
                    <p class="price-in-word">{{ BuyAmountInWords }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="5" class="pa-0 my-2">
                <div class="goldbox-section">
                  <div class="Treasury-box">
                    <p>موجودی خزانه :</p>
                    <p>15678 گرم</p>
                  </div>
                  <div class="wallet-box">
                    <p>موجودی کیف پول :</p>
                    <p>{{ formatNumber(walletUser.balance) }} تومان</p>
                  </div>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">گرم طلا :</p>
                    <p class="mb-0">{{ buyInfo.goldWeight }} گرم</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">کارمزد خرید :</p>
                    <p class="mb-0">0٪</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">مبلغ قابل پرداخت :</p>
                    <p class="mb-0">
                      {{ formatNumber(buyInfo.goldprice) }} تومان
                    </p>
                  </div>
                  <div class="my-2">
                    <v-btn
                      color="#00603a"
                      :loading="loading"
                      @click="CreateBuy"
                      block
                      >خرید</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <v-container>
            <v-row>
              <v-col cols="12" md="7" class="pa-0 my-2">
                <div class="goldbox-section sell me-2">
                  <div class="live-price-box">
                    <span class="live-tag">لحظه ای</span>
                    <p>قیمت طلای 18 عیار:</p>
                    <p class="fade-badge">
                      {{ formatNumber(goldPriceLive.buyPrice) }} تومان
                    </p>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-3': isSwapped, 'order-1': !isSwapped }"
                  >
                    <span>وزن طلا (گرم)</span>
                    <v-text-field
                      v-model="sellInfo.goldWeight"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="sellGoldweightConvert"
                      :rules="weightRules"
                    ></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center order-2">
                    <v-btn
                      icon="mdi-swap-horizontal"
                      variant="text"
                      class="change-btn"
                      @click="swapFields"
                    ></v-btn>
                  </div>
                  <div
                    class="my-1"
                    :class="{ 'order-1': isSwapped, 'order-3': !isSwapped }"
                  >
                    <span>مبلغ (تومان)</span>
                    <v-text-field
                      v-model="sellInfo.goldPrice"
                      variant="outlined"
                      color="rgba(135, 104, 36, 1)"
                      density="compact"
                      @input="sellGoldpriceConvert"
                    ></v-text-field>
                    <p class="price-in-word">{{ SellAmountInWords }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="5" class="pa-0 my-2">
                <div class="goldbox-section">
                  <div class="Treasury-box sell">
                    <p>موجودی خزانه :</p>
                    <p>15678 گرم</p>
                  </div>
                  <div class="wallet-box sell">
                    <p>موجودی صندوق طلا :</p>
                    <p>{{ walletUser.goldWeight }} گرم</p>
                  </div>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">گرم طلا :</p>
                    <p class="mb-0">{{ sellInfo.goldWeight }} گرم</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">کارمزد فروش :</p>
                    <p class="mb-0">1٪</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="d-flex justify-space-between py-2 px-4 my-1">
                    <p class="mb-0">مبلغ قابل پرداخت :</p>
                    <p class="mb-0">
                      {{ formatNumber(sellInfo.goldPrice) }} تومان
                    </p>
                  </div>
                  <div class="my-2">
                    <v-btn
                      color="#930606"
                      :loading="sellLoading"
                      @click="CreateSell"
                      block
                      >فروش</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
      <h3 class="title mt-10">تاریخچه تراکنش ها</h3>
      <div class="trade-history pa-md-3">
        <div class="d-flex flex-column flex-md-row justify-space-between">
          <v-tabs v-model="historyTab" bg-color="white" class="w-100">
            <v-tab value="one">خرید</v-tab>
            <v-tab value="two">فروش</v-tab>
          </v-tabs>
          <div class="d-flex justify-start justify-md-end w-100 mt-3">
            <v-combobox
              label="وضعیت پرداخت"
              :items="filter"
              item-title="text"
              item-value="value"
              density="comfortable"
              variant="solo"
              class="transaction-filter w-100"
              @update:modelValue="filterChange"
            ></v-combobox>
          </div>
        </div>
        <v-tabs-window v-model="historyTab">
          <v-tabs-window-item value="one" class="transaction-box">
            <div class="d-flex justify-end"></div>
            <v-data-table
              :headers="Transactionheaders"
              :items="BuyTransactionItems"
              :loading="TransactionLoading"
              class="transaction-table"
            >
              <template v-slot:item.status="{ item }">
                <div class="">
                  <v-chip
                    :text="
                      item.status == 'completed'
                        ? 'موفق'
                        : item.status == 'pending'
                        ? 'نامشخص'
                        : 'ناموفق'
                    "
                    :color="
                      item.status == 'completed'
                        ? 'green'
                        : item.status == 'pending'
                        ? '#666666'
                        : 'red'
                    "
                    size="small"
                  ></v-chip>
                </div>
              </template>
              <template v-slot:item.goldPrice="{ item }">
                <p>{{ formatNumber(item.goldPrice) }}</p>
              </template>
              <template v-slot:item.totalPrice="{ item }">
                <p>{{ formatNumber(item.totalPrice) }}</p>
              </template>
              <template v-slot:item.fromPhone="{ item }">
                <div class="">
                  <v-chip
                    :text="item.fromPhone == true ? 'تلفنی' : 'آنلاین'"
                    color="#78909C"
                    size="small"
                  ></v-chip>
                </div>
              </template>
            </v-data-table>
          </v-tabs-window-item>

          <v-tabs-window-item value="two" class="transaction-box">
            <v-data-table
              :headers="Transactionheaders"
              :items="SellTransactionItems"
              :loading="TransactionLoading"
              class="transaction-table"
            >
              <template v-slot:item.status="{ item }">
                <div class="">
                  <v-chip
                    :text="
                      item.status == 'completed'
                        ? 'موفق'
                        : item.status == 'pending'
                        ? 'نامشخص'
                        : 'ناموفق'
                    "
                    :color="
                      item.status == 'completed'
                        ? 'green'
                        : item.status == 'pending'
                        ? '#666666'
                        : 'red'
                    "
                    size="small"
                  ></v-chip>
                </div>
              </template>
              <template v-slot:item.goldPrice="{ item }">
                <p>{{ formatNumber(item.goldPrice) }}</p>
              </template>
              <template v-slot:item.totalPrice="{ item }">
                <p>{{ formatNumber(item.totalPrice) }}</p>
              </template>
              <template v-slot:item.fromPhone="{ item }">
                <div class="">
                  <v-chip
                    :text="item.fromPhone == true ? 'تلفنی' : 'آنلاین'"
                    color="#78909C"
                    size="small"
                  ></v-chip>
                </div>
              </template>
            </v-data-table>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </v-container>

    <v-dialog max-width="500" v-model="buyModal" class="trade-modal">
      <v-card class="trade-modal">
        <div class="buyModal-content py-10">
          <h3>فاکتور خرید</h3>
          <div class="wallet-badge my-2">
            <span class="pe-6">موجودی کیف پول</span>
            <span>{{ paymentInfo.balance }} تومان</span>
          </div>
          <div
            class="d-flex justify-space-evenly align-center w-100 my-2 k-text"
          >
            <p class="pe-6">مقدار طلا</p>
            <p>{{ buyInfo.goldWeight }} گرم</p>
          </div>
          <div
            class="d-flex justify-space-evenly align-center w-100 my-2 k-text"
          >
            <p class="pe-6">مبلغ</p>
            <p>{{ buyInfo.goldprice }} تومان</p>
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
          <v-btn
            text="پرداخت مستقیم"
            class="pay-btn"
            color="#9D7E3B"
            @click="CompleteBuy('direct')"
          ></v-btn>
          <v-btn
            text="پرداخت از کیف پول"
            class="pay-btn"
            color="#9D7E3B"
            variant="outlined"
            @click="CompleteBuy('wallet')"
          ></v-btn>
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
          <div
            class="d-flex justify-space-evenly align-center w-100 my-2 k-text"
          >
            <p class="pe-6">مقدار طلا</p>
            <p>{{ sellInfo.goldWeight }} گرم</p>
          </div>
          <div
            class="d-flex justify-space-evenly align-center w-100 my-2 k-text"
          >
            <p class="pe-6">مبلغ</p>
            <p>{{ sellInfo.goldPrice }} تومان</p>
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
          <v-btn
            text="تایید فروش"
            class="pay-btn"
            color="#9D7E3B"
            @click="CompleteSell()"
          ></v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-alert
      v-if="alertError"
      color="error"
      border="bottom"
      elevation="2"
      class="k-alert alert-animatiton"
      closable
    >
      {{ errorMsg }}
    </v-alert>

    <v-alert
      v-if="alertSuccess"
      color="success"
      border="bottom"
      elevation="2"
      class="k-alert alert-animatiton"
      closable
    >
      {{ successMsg }}
    </v-alert>
  </div>
</template>

<script setup>
import PriceService from "@/service/auth/price";
import TradeService from "@/service/auth/trade";
import TimerIcon from "@/assets/images/icons/TimerIcon.vue";
import { onMounted, ref, watch, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { numberToWords } from "@persian-tools/persian-tools";

const route = useRoute();

const walletUser = ref("");
const tab = ref(null);
const loading = ref(false);
const sellLoading = ref(false);
const GoldPriceLoading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");
const alertError = ref(false);
const alertSuccess = ref(false);
const buyModal = ref(false);
const sellModal = ref(false);
const isSwapped = ref(false);
const historyTab = ref(null);
const goldPriceLive = ref({
  sellPrice: "",
  buyPrice: "",
  change: "",
});
const timer = ref(30);
const TransactionLoading = ref(false);
const SellTransactionItems = ref();
const BuyTransactionItems = ref();
const Transactionheaders = ref([
  {
    title: "تاریخ",
    key: "date",
  },
  {
    title: "روش ثبت",
    key: "fromPhone",
  },
  {
    title: "زمان",
    key: "time",
  },
  {
    title: "وزن طلا(گرم)",
    key: "goldWeight",
  },
  {
    title: "قیمت نهایی",
    key: "totalPrice",
  },
  {
    title: "قیمت طلا در لحظه",
    key: "goldPrice",
  },
  {
    title: "وضعیت",
    key: "status",
  },
]);
const filter = ref([
  {
    text: "همه",
    value: "",
  },
  {
    text: "موفق",
    value: "success",
  },
  {
    text: "ناموفق",
    value: "failed",
  },
  {
    text: "نامشخص",
    value: "pending",
  },
]);
let interval = ref(null);
const invoice = ref({
  invoiceId: "",
  paymentUrl: "",
});
const buyInfo = ref({
  goldprice: "",
  goldWeight: "",
});
const sellInfo = ref({
  goldPrice: "",
  goldWeight: "",
});
const paymentInfo = ref({
  invoiceId: "",
  amount: "",
  isFromWallet: "",
  balance: 0,
});

const paymentSellInfo = ref({
  invoiceId: "",
  amount: "",
  isFromWallet: "",
  balance: 0,
  goldWeight: 0,
});

const payInfo = ref({
  type: "",
  totalPrice: "",
  goldPrice: "",
  goldWeight: "",
});
const paySellInfo = ref({
  type: "",
  totalPrice: "",
  goldPrice: "",
  goldWeight: "",
});

const filterTransaction = ref({
  status: "",
});

const verifyDetail = ref({});

const weightRules = [
  (v) => !!v || "مقدار ورودی نمی‌تواند خالی باشد",
  (v) => /^\d+(\.\d{1,3})?$/.test(v) || "فقط عدد مجاز است و حداکثر 3 رقم اعشار",
];

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const BuyAmountInWords = computed(() => {
  if (buyInfo.value.goldprice && buyInfo.value.goldprice != "") {
    const amountWithoutCommas = buyInfo.value.goldprice.toString().replace(/,/g, "");
    const amountInRial = parseInt(amountWithoutCommas, 10);

    if (amountInRial < 1) {
      return "کمتر از یک تومان";
    }

    return numberToWords(Math.floor(amountInRial)) + " تومان";
  }
  return "";
});

const SellAmountInWords = computed(() => {
  if (sellInfo.value.goldPrice && sellInfo.value.goldPrice != "") {
    const amountWithoutCommas = sellInfo.value.goldPrice.toString().replace(/,/g, "");
    const amountInRial = parseInt(amountWithoutCommas, 10);

    if (amountInRial < 1) {
      return "کمتر از یک تومان";
    }

    return numberToWords(Math.floor(amountInRial)) + " تومان";
  }
  return "";
});

const GetGoldPrice = async () => {
  try {
    GoldPriceLoading.value = true;
    const response = await PriceService.GoldPrice();
    goldPriceLive.value.buyPrice = response.buyPrice;
    goldPriceLive.value.sellPrice = response.sellPrice;
    goldPriceLive.value.change = response.change;
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  } finally {
    GoldPriceLoading.value = false;
  }
};

const buyGoldpriceConvert = () => {
  buyInfo.value.goldprice = buyInfo.value.goldprice.replace(/[^0-9]/g, "");
  buyInfo.value.goldWeight = (
    buyInfo.value.goldprice / goldPriceLive.value.buyPrice
  ).toFixed(3);
};

const buyGoldweightConvert = () => {
  buyInfo.value.goldWeight = buyInfo.value.goldWeight.replace(/[^0-9.]/g, "");
  console.log(buyInfo.value.goldWeight)
  const parts = buyInfo.value.goldWeight.split(".");
  if (parts.length > 1) {
    buyInfo.value.goldWeight = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts.length > 1 && parts[1].length > 2) {
    buyInfo.value.goldWeight = parts[0] + "." + parts[1].slice(0, 3);
  }

  buyInfo.value.goldprice = parseInt(
    buyInfo.value.goldWeight * goldPriceLive.value.buyPrice
  );
};

const sellGoldpriceConvert = () => {
  sellInfo.value.goldPrice = sellInfo.value.goldPrice.replace(/[^0-9]/g, "");
  sellInfo.value.goldWeight = (
    sellInfo.value.goldPrice / goldPriceLive.value.sellPrice
  ).toFixed(3);
};

const sellGoldweightConvert = () => {
  sellInfo.value.goldWeight = sellInfo.value.goldWeight.replace(/[^0-9.]/g, "");
  const parts = sellInfo.value.goldWeight.split(".");
  if (parts.length > 1) {
    sellInfo.value.goldWeight = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts.length > 1 && parts[1].length > 2) {
    sellInfo.value.goldWeight = parts[0] + "." + parts[1].slice(0, 3);
  }

  sellInfo.value.goldPrice = parseInt(
    sellInfo.value.goldWeight * goldPriceLive.value.sellPrice
  );
};

const swapFields = () => {
  isSwapped.value = !isSwapped.value;
};

const validateWeight = [
  (v) => !!v || "مقدار ورودی نمی‌تواند خالی باشد",
  (v) => /^\d+(\.\d{1,3})?$/.test(v) || "فقط عدد مجاز است و حداکثر 3 رقم اعشار",
];

const CreateBuy = async () => {
  try {
    loading.value = true;
    payInfo.value.type = "buy";
    payInfo.value.totalPrice = buyInfo.value.goldprice;
    payInfo.value.goldWeight = buyInfo.value.goldWeight;
    payInfo.value.goldPrice = goldPriceLive.value.buyPrice;
    console.log(payInfo);
    const response = await TradeService.createInvoice(payInfo.value);
    paymentInfo.value.invoiceId = response.transactionId;
    paymentInfo.value.balance = response.wallet.balance;
    buyModal.value = true;
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 5000);
  } finally {
    loading.value = false;
  }
};

const CompleteBuy = async (paymentMethod) => {
  try {
    loading.value = true;
    if (paymentMethod == "wallet") {
      paymentInfo.value.isFromWallet = true;
    } else {
      paymentInfo.value.isFromWallet = false;
    }
    paymentInfo.value.amount = buyInfo.value.goldprice;
    const response = await TradeService.complateTransaction(paymentInfo.value);
    if (response.isFromWallet == true) {
      buyModal.value = false;
      router.replace("/");
    } else {
      invoice.value.paymentUrl = response.paymentUrl;
      invoice.value.invoiceId = response.invoiceId;
      window.location.href = invoice.value.paymentUrl;
    }
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 5000);
  } finally {
    loading.value = false;
    Transaction();
  }
};

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
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 5000);
  } finally {
    sellLoading.value = false;
  }
};

const CompleteSell = async () => {
  try {
    sellLoading.value = true;
    paymentSellInfo.value.amount = sellInfo.value.goldPrice;
    paymentSellInfo.value.fee = 1;
    const response = await TradeService.complateSellTransaction(
      paymentSellInfo.value
    );
    sellModal.value = false;
    successMsg.value = "طلای شما با موفقیت به فروش رسید";
    alertSuccess.value = true;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 5000);
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 5000);
  } finally {
    sellLoading.value = false;
    Transaction();
  }
};

const filterChange = (filterValue) => {
  filterTransaction.value.status = filterValue.value;
  sellTransaction();
  buyTransaction();
};

const sellTransaction = async () => {
  try {
    TransactionLoading.value = true;
    const response = await TradeService.GoldBoxSellTransactions(
      filterTransaction.value
    );
    SellTransactionItems.value = response;
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  } finally {
    TransactionLoading.value = false;
  }
};

const buyTransaction = async () => {
  try {
    TransactionLoading.value = true;
    const response = await TradeService.GoldBoxBuyTransactions(
      filterTransaction.value
    );
    BuyTransactionItems.value = response;
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  } finally {
    TransactionLoading.value = false;
  }
};

const VerifyTransaction = async (zarinpal) => {
  try {
    const response = await TradeService.VerifyTransaction(zarinpal);
    console.log(response);
    verifyDetail.value = response;
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  }
};

onMounted(() => {
  GetGoldPrice();
  buyTransaction();
  sellTransaction();
  setInterval(() => {
    GetGoldPrice();
  }, 30000);

  walletUser.value = JSON.parse(localStorage.getItem("user"));

  const zarinpal = ref({
    authority: route.query.Authority,
    status: route.query.Status,
  });

  if (zarinpal.value.authority && zarinpal.value.status) {
    VerifyTransaction(zarinpal.value);
    if (zarinpal.value.status === "OK") {
      router.push({ name: "success", state: verifyDetail.value });
    } else {
      router.push({ name: "failed", state: verifyDetail.value });
    }
  }
});

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
.goldbox-section {
  box-shadow: 0px 0px 9px 0px rgba(217, 198, 166, 0.4);
  border-radius: 16px;
  padding: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.goldbox-section.buy {
  background-color: rgba(72, 189, 142, 0.1);
  border: 1px solid #00603a;
}

.goldbox-section.sell {
  background-color: rgba(189, 76, 72, 0.1);
  border: 1px solid #930606;
}

.tab-header {
  border-radius: 10px;
  box-shadow: 0px 0px 9px 0px rgba(217, 198, 166, 0.4);
}

.tab-header button {
  border-radius: 0 !important;
  font-size: 18px;
  letter-spacing: 0 !important;
}

.tab-header button.v-tab-item--selected {
  border-bottom: 2px solid #00603a !important;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: rgba(0, 96, 58, 1);
  text-align: center;
  margin-top: 0.2rem;
}

.subtitle {
  font-size: 24px;
  font-weight: 300;
  color: rgba(0, 96, 58, 1);
  margin: 0.8rem 0;
  text-align: center;
}

.change-btn {
  border-radius: 100% !important;
  transform: rotate(90deg);
}

.transition-field {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}

.live-price-box {
  margin: 0.5rem 0;
  background-color: #fff;
  border-radius: 10px;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.wallet-box {
  margin: 0.5rem 0;
  background-color: rgba(72, 189, 142, 0.1);
  border-radius: 10px;
  border: 1px solid #00603a;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Treasury-box {
  margin: 0.5rem 0;
  background-color: rgba(72, 189, 142, 0.1);
  border-radius: 10px;
  border: 1px solid #00603a;
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Treasury-box.sell {
  background-color: rgba(189, 76, 72, 0.1);
  border: 1px solid #930606;
}

.wallet-box.sell {
  background-color: rgba(189, 76, 72, 0.1);
  border: 1px solid #930606;
}

.live-tag {
  background-color: rgba(147, 6, 6, 1);
  color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(154, 154, 154, 0.62);
  border-radius: 12px;
  font-size: 10px;
  padding: 3px 8px;
  position: absolute;
  top: -10px;
  left: -10px;
}

@keyframes fadeInOut {
  0%,
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-badge {
  animation: fadeInOut 5s infinite ease-in-out;
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

.k-alert {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  padding: 2px !important;
}

.trade-history {
  margin-top: 1rem;
  background-color: #fff;
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
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

.trade-modal {
  border-radius: 10px !important;
}

.price-in-word{
  font-size: 13px;
  color: #696969;
}
</style>
