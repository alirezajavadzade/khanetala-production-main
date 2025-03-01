<template>
  <v-row class="mt-5">
    <v-col cols="12" md="4">
      <div class="d-card">
        <div class="d-flex justify-space-between">
          <span class="k-text">موجودی کیف پول</span>
          <div class="icon-box">
            <walletIcon class="icon" />
          </div>
        </div>
        <div v-if="walletLoading" class="wallet-loading">
          <v-progress-circular color="white" indeterminate></v-progress-circular>
        </div>
        <p v-else>{{ formatNumber(wallet.walletPrice) }} ریال</p>
        <div class="d-flex justify-space-around">
          <button class="k-btn" disabled>افزایش موجودی</button>
          <button class="k-btn-second" disabled>برداشت</button>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <div class="d-card">
        <div class="d-flex justify-space-between">
          <span class="k-text">دارایی طلا</span>
          <div class="icon-box">
            <walletIcon class="icon" />
          </div>
        </div>
        <div v-if="walletLoading" class="wallet-loading">
          <v-progress-circular color="white" indeterminate></v-progress-circular>
        </div>
        <p v-else>{{ wallet.walletWeight }} گرم</p>
        <div class="d-flex justify-space-around">
          <button class="k-btn" disabled>افزایش موجودی</button>
          <button class="k-btn-second" disabled>برداشت</button>
        </div>
      </div>

    </v-col>
    <v-col cols="12" md="4">
      <div class="d-card-value">
        <apexchart :options="chartOptions" :series="series" type="pie"></apexchart>
        <!-- <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <ArrowIcon />
              <span class="title">میزان سود ماهانه</span>
            </div>
            <p class="price">
              120,000 تومان
            </p>
          </div>
          <div class="d-flex flex-column align-center">
            <span class="price-per">+28 درصد</span>
            <linechartIcon />
          </div>
        </div>
        <div class="divider"></div>
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <ArrowIcon />
              <span class="title">میزان خرید ماهانه</span>
            </div>
            <p class="price">
              5,000,000 تومان
            </p>
          </div>
          <div class="d-flex flex-column align-center">
            <span class="price-per">+10 درصد</span>
            <linechartIcon />
          </div>
        </div> -->
      </div>
    </v-col>
    <v-col cols="12">
      <div class="d-card-value">
        <apexchart :options="areaChartOptions" :series="areaSeries" type="area"></apexchart>

      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import walletIcon from '@/assets/images/icons/walletIcon.vue'
import { ref, onMounted } from 'vue';
import AuthService from '@/service/auth/auth';


const errorMsg = ref('');
const alertError = ref(false);
const wallet = ref({
  walletPrice: 0,
  walletWeight: 0,
  walletId: '',
});
const walletLoading = ref(false);
const series = ref([40, 60,]); // مقادیر داده‌ها
const chartOptions = ref({
  colors: ['#00603A', '#F5F1E9'],
  chart: {
    type: 'donut',
  },
  labels: ['کیف پول طلایی', 'کیف پول ریالی'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 300,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    }
  }],
});


const areaSeries = ref([
  {
    name: 'قیمت لحظه ای طلا',
    data: [37086100, 33090710, 32566800, 33202330, 35129410, 37382000, 42696510, 44409480, 49010790, 51634900, 62999220],
  },
]);

const areaChartOptions = ref({
  colors: ['#00603A', '#F5F1E9'],
  chart: {
    type: 'area',
  },
  toolbar: {
    show: false,
  },
  xaxis: {
    categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن'],
  },
});

const GetWallet = async () => {
  try {
    walletLoading.value = true;
    const response = await AuthService.Wallet();
    wallet.value.walletPrice = response.balance;
    wallet.value.walletWeight = response.goldWeight;
    wallet.value.walletId = response.id;
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
}


const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


onMounted(() => {
  GetWallet();
})


</script>

<style scoped>
.d-card {
  background-color: rgba(56, 120, 93, 1);
  box-shadow: 4px 4px 20px 0px rgba(77, 179, 138, 0.4);
  padding: 12px 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
}

.d-card-value {
  padding: 12px 24px;
  border-radius: 16px;
  background-color: rgba(254, 253, 251, 0.6);
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
}

.d-card .icon-box {
  background-color: #F4E9D4;
  padding: 3px;
  border-radius: 10px;
  display: flex;
}

.d-card .k-text {
  font-weight: 400;
  color: #fff;
  text-shadow: 2px 1px 5px rgba(0, 65, 39, 1);
}

.d-card p {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: end;
  margin: 1.5rem 0;
}

.k-btn {
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(56, 120, 93, 1);
  background-color: #fff;
  border: 0;
}

.k-btn:hover {
  background-color: #e3e3e3;
  color: rgba(56, 120, 93, 1);
}

.k-btn:active {
  background-color: #e3e3e3;
  color: rgba(56, 120, 93, 1);
}


.k-btn-second {
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border: 0;
}

.k-btn-second:hover {
  color: #eaeaea;
}

.k-btn-second:active {
  color: #e3e3e3;
}

.d-card-value .title {
  color: rgba(92, 92, 92, 1);
  font-size: 12px;
  font-weight: 300;
}

.d-card-value .price {
  font-size: 28px;
  font-weight: 400;
  color: rgba(0, 96, 58, 1);
}

.price-per {
  font-size: 11px;
  font-weight: 400;
  color: rgba(0, 96, 58, 1);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(186, 186, 186, 1);
  margin: 1.1rem 0;
}

.wallet-loading {
  display: flex;
  justify-content: flex-end;
  min-height: 42px;
  margin: 1.5rem 0;
}
</style>