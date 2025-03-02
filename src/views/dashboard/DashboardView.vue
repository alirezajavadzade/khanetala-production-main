<template>
  <v-row class="mt-5">
    <!-- <v-col cols="12" md="4">
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
      </div>
    </v-col>
    <v-col cols="12">
      <div class="d-card-value">
        <apexchart :options="areaChartOptions" :series="areaSeries" type="area"></apexchart>
      </div>
    </v-col> -->


    <v-col cols="6" md="3" class="my-1">
      <div class="k-card">
        <div class="icon-box">
          <WalletMoneyIcon class="icon" />
        </div>
        <div class="d-flex flex-column align-center">
          <p class="title mx-3">کیف پول</p>
          <v-progress-circular color="white" indeterminate v-if="walletLoading"></v-progress-circular>
          <p class="number" v-else>120,000,000</p>
        </div>
      </div>
    </v-col>
    <v-col cols="6" md="3" class="my-1">
      <div class="k-card">
        <div class="icon-box">
          <dollarIcon class="icon" />
        </div>
        <div class="d-flex flex-column align-center">
          <p class="title mx-3">دارایی طلا</p>
          <v-progress-circular color="white" indeterminate v-if="walletLoading"></v-progress-circular>
          <p class="number" v-else>{{ wallet.walletWeight }} گرم</p>
        </div>
      </div>
    </v-col>
    <v-col cols="6" md="3" class="my-1">
      <div class="k-card">
        <div class="icon-box">
          <chartIcon class="icon" />
        </div>
        <div class="d-flex flex-column align-center">
          <p class="title mx-3">دارایی کل</p>
          <v-progress-circular color="white" indeterminate v-if="walletLoading"></v-progress-circular>
          <p class="number" v-else>0 ریال</p>
        </div>
      </div>
    </v-col>
    <v-col cols="6" md="3" class="my-1">
      <div class="k-card">
        <div class="icon-box">
          <DiagramUpIcon class="icon" />
        </div>
        <div class="d-flex flex-column align-center">
          <p class="title mx-3">سود ماهانه</p>
          <v-progress-circular color="white" indeterminate v-if="walletLoading"></v-progress-circular>
          <p class="number" v-else>23.6 ٪</p>
        </div>
      </div>
    </v-col>
    <!-- charts -->
    <v-col cols="12" md="6" class="my-1">
      <div class="chart-card">
        <h3>خرید در ماه</h3>
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
      </div>
    </v-col>
    <v-col cols="12" md="6" class="my-1">
      <div class="chart-card">
        <h3>قیمت لحظه ای طلا</h3>
        <Line :options="chartOptions2" :data="chartData2" />
      </div>
    </v-col>
    <v-col cols="12" md="3" class="my-1">
      <div class="chart-card">
        <h3>میزان دارایی شما</h3>
        <Doughnut :options="chartOptions3" :data="chartData3" />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AuthService from '@/service/auth/auth';
import chartIcon from '@/assets/images/icons/Chart.vue'
import dollarIcon from '@/assets/images/icons/Dollar.vue'
import DiagramUpIcon from '@/assets/images/icons/DiagramUp.vue'
import WalletMoneyIcon from '@/assets/images/icons/WalletMoney.vue'
import { Bar, Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)


const errorMsg = ref('');
const alertError = ref(false);
const wallet = ref({
  walletPrice: 0,
  walletWeight: 0,
  walletId: '',
});
const chartData = ref({
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  datasets: [{ data: [40, 20, 12, 50, 96, 12, 8, 70, 59, 63, 48, 50], backgroundColor: '#00603A', }],
})
let delayed;
const chartOptions = ref({
  responsive: true,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
})

const chartData2 = ref({
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#00603A',
      data: [40, 20, 12, 50, 96, 12, 8, 70, 59, 63, 48, 50],
    }
  ]
})
const chartOptions2 = ref({
  responsive: true,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
})




const chartData3 = ref({
  labels: ['دارایی طلایی', 'دارایی ریالی',],
  datasets: [
    {
      backgroundColor: ['#00603A', '#008651'],
      data: [20, 80]
    }
  ]
})
const chartOptions3 = ref({
  responsive: true,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
})



const walletLoading = ref(false);

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

.k-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.chart-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.1);
}

.k-card .icon-box {
  height: 4rem;
  width: 4rem;
  background-color: rgba(173, 239, 198, 0.25);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.k-card .number {
  font-weight: 700;
  margin-top: 0.4rem;
}

.k-card .title {
  font-size: 18px;
  font-weight: 300;
  margin-top: 0.4rem;
}
</style>