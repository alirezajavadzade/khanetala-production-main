<template>
  <v-container class="container py-5" :fluid="false">
    <div class="d-flex justify-end d-md-none">
      <v-app-bar-nav-icon
        class="d-none"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-btn
        id="menu-activator-mobile"
        density="compact"
        variant="text"
        class="d-flex d-md-none"
      >
        <span class="profile-text">{{ user.firstName }} عزیز</span>
        <User class="mx-2" />
      </v-btn>
      <v-menu activator="#menu-activator-mobile">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn variant="text" class="logout-btn ma-0" @click="logout">
                <logOut />
                خروج از حساب
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-layout class="d-md-none">
      <v-navigation-drawer v-model="drawer" class="sidebar" temporary>
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="خانه طلا" />
        </div>
        <div class="content">
          <RouterLink class="link" to="/">
            <DashboardIcon class="dashboard-icon" />
            <span>پیشخوان</span>
          </RouterLink>
          <RouterLink class="link" to="Goldbox">
            <GoldboxIcon class="dashboard-icon" />
            <span>صندوق طلا</span>
          </RouterLink>
          <RouterLink class="link" to="Bankinfo">
            <CardsIcon class="dashboard-icon" />
            <span>کیف پول</span>
          </RouterLink>
          <RouterLink class="link" to="PersonalInfo">
            <EditInfo class="dashboard-icon" />
            <span>اطلاعات شخصی</span>
          </RouterLink>
        </div>
      </v-navigation-drawer>
    </v-layout>
    <v-row class="h-100">
      <v-col md="2" class="d-none d-md-flex">
        <div class="d-none d-md-flex sidebar">
          <div class="logo">
            <img src="/src/assets/logo.svg" alt="خانه طلا" />
          </div>
          <div class="content">
            <RouterLink class="link" to="/">
              <DashboardIcon class="dashboard-icon" />
              <span>پیشخوان</span>
            </RouterLink>
            <RouterLink class="link" to="Goldbox">
              <GoldboxIcon class="dashboard-icon" />
              <span>صندوق طلا</span>
            </RouterLink>
            <RouterLink class="link" to="Bankinfo">
              <CardsIcon class="dashboard-icon" />
              <span>کیف پول</span>
            </RouterLink>
            <RouterLink class="link" to="PersonalInfo">
              <EditInfo class="dashboard-icon" />
              <span>اطلاعات شخصی</span>
            </RouterLink>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="10">
        <div class="header">
          <div v-if="!haveBank" class="d-flex justify-center align-center">
            <CartIcon />
            <p class="header-text">
              برای شروع معامله لطفا کارت بانکی خود را ثبت کنید
            </p>
            <v-btn
              class="save-cart-btn"
              variant="flat"
              size="small"
              @click="cartDialog = true"
              >ثبت کارت</v-btn
            >
          </div>
          <div class="d-flex justify-space-between justify-md-start w-100" v-else>
            <div class="assets-gold">
              <p class="ma-0">موجودی طلایی: {{ user.wallet.goldWeight }} گرم</p>
            </div>
            <div class="assets-price">
              <p class="ma-0">
                موجودی کیف پول: {{ user.wallet.balance }} تومان
              </p>
            </div>
          </div>
          <v-btn
            id="menu-activator-desc"
            density="compact"
            variant="text"
            class="d-none d-md-flex"
          >
            <span class="profile-text">{{ user.firstName }} عزیز</span>
            <User class="mx-2" />
          </v-btn>
          <v-menu activator="#menu-activator-desc">
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="text" class="logout-btn ma-0" @click="logout">
                    <logOut />
                    خروج از حساب
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div>
          <slot />
        </div>
      </v-col>
    </v-row>
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
  </v-container>
  <v-dialog v-model="cartDialog" width="auto">
    <v-card class="cart-Dialog">
      <div class="title my-3">
        <InfoIcon />
        <p>مالکیت کارت باید به نام خودتان باشد</p>
      </div>
      <v-form ref="form" v-model="isValid" @submit.prevent="submitCart">
        <v-text-field
          v-model="cardNumber"
          variant="outlined"
          color="rgba(135, 104, 36, 1)"
          density="compact"
          label="شماره کارت"
          class="mb-0 mt-2"
          :rules="cartValidationRule"
          @input="limitCartInput"
        ></v-text-field>
        <v-btn
          type="submit"
          text="ثبت کارت"
          block
          color="#9D7E3B"
          variant="flat"
          class="submit-cart-btn"
          :disabled="!isValid"
          :loading="cartLoading"
        ></v-btn>
      </v-form>
    </v-card>
  </v-dialog>
  <div class="bottom-nav d-md-none">
    <RouterLink class="bottom-nav-box" to="/">
      <DashboardIcon class="dashboard-icon" />
      <span>پیشخوان</span>
    </RouterLink>
    <RouterLink class="bottom-nav-box" to="Goldbox">
      <GoldboxIcon class="dashboard-icon" />
      <span>صندوق طلا</span>
    </RouterLink>
    <RouterLink class="bottom-nav-box" to="Bankinfo">
      <CardsIcon class="dashboard-icon" />
      <span>کیف پول</span>
    </RouterLink>
    <RouterLink class="bottom-nav-box" to="PersonalInfo">
      <EditInfo class="dashboard-icon" />
      <span>اطلاعات شخصی</span>
    </RouterLink>
  </div>
</template>

<script setup>
import DashboardIcon from "@/assets/images/icons/DashboardIcon.vue";
import CardsIcon from "@/assets/images/icons/CardsIcon.vue";
import GoldboxIcon from "@/assets/images/icons/GoldboxIcon.vue";
import EditInfo from "@/assets/images/icons/editIcon.vue";
import logOut from "@/assets/images/icons/logoutIcon.vue";
import User from "@/assets/images/icons/userIcon.vue";
import CartIcon from "@/assets/images/icons/CartIcon.vue";
import InfoIcon from "@/assets/images/icons/InfoIcon.vue";
import { ref, onMounted } from "vue";
import router from "@/router";
import AuthService from "@/service/auth/auth";

const drawer = ref(false);
const user = ref({});
const errorMsg = ref("");
const alertError = ref(false);
const cartDialog = ref(false);
const cartLoading = ref(false);
const cardNumber = ref("");
const isValid = ref(false);
const haveBank = ref(false);
const alertSuccess = ref(false);
const successMsg = ref("");

const cartValidationRule = [
  (v) => /^\d{16}$/.test(v) || "شماره کارت باید 16 رقم باشد",
  (v) => !!v || "شماره کارت نمی‌تواند خالی باشد",
];

const limitCartInput = () => {
  cardNumber.value = cardNumber.value.replace(/\D/g, "").slice(0, 16);
};

const submitCart = async () => {
  try {
    cartLoading.value = true;
    const response = await AuthService.BankCart(cardNumber.value);
    cartDialog.value = false;
    GetUser();
    cardNumber.value = "";
    successMsg.value = "کارت با موفقیت ثبت شد";
    alertSuccess.value = true;
    setTimeout(() => {
      alertSuccess.value = false;
    }, 10000);
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  } finally {
    cartLoading.value = false;
  }
};

const GetUser = async () => {
  try {
    const response = await AuthService.Profile();
    user.value = response;
    localStorage.setItem("user", JSON.stringify(user.value.wallet));
    if (response.isHaveBank == true) {
      haveBank.value = true;
    }
    return response;
  } catch (error) {
    errorMsg.value = error.response.data.msg || "خطایی رخ داده است!";
    alertError.value = true;
    setTimeout(() => {
      alertError.value = false;
    }, 10000);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.replace("/login");
};

onMounted(() => {
  GetUser();
});
</script>

<style scoped>
.container {
  max-width: 1440px;
  height: 100vh;
}

.sidebar {
  height: fit-content;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 36px 12px;
  width: 100%;
}

.sidebar .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 100%;
}

.sidebar .content .link {
  display: flex;
  align-items: center;
  width: 90%;
  padding: 14px 5px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(52, 64, 84, 1);
  margin: 0.3rem 1rem;
}

.sidebar .content .link svg {
  filter: invert(35%) sepia(17%) saturate(2%) hue-rotate(351deg) brightness(94%)
    contrast(88%);
}

.sidebar .content .link.router-link-active {
  background-color: #fff;
  box-shadow: 0px 0px 12px 0px rgba(175, 139, 74, 0.52);
  color: #000;
  font-weight: 400;
}

.sidebar .content .link.router-link-active svg {
  filter: brightness(0) saturate(100%);
}

.sidebar .logo {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.header {
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 4px 4px 12px 0px rgba(212, 205, 191, 0.4);
  backdrop-filter: blur(12px);
  border-radius: 16px;
}

.dashboard-icon {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(63deg) brightness(102%) contrast(100%);
  margin: 0 5px;
}

.profile-text {
  font-size: 18px;
  color: #00603a;
  letter-spacing: 0 !important;
}

.profile-icon {
  margin-right: 1rem;
}

.logout-btn {
  margin-top: 100%;
  color: #008651;
}

.header-text {
  font-size: 9px;
  color: #00603a;
  padding-right: 0.5rem;
}

@media (min-width: 768px) {
  .header-text {
    font-size: 14px;
    color: #00603a;
    padding-right: 0.5rem;
  }
}

.save-cart-btn {
  height: 1.5rem !important;
  letter-spacing: 0 !important;
  margin: 0 1rem;
  background-color: rgba(0, 96, 58, 1);
  color: #fff;
}

.cart-Dialog {
  border-radius: 16px !important;
  padding: 2rem;
}

.cart-Dialog .title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d7e7ff;
  color: #000;
  padding: 0.4rem 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.cart-Dialog .title p {
  margin: 0 0.5rem;
  font-size: 14px;
}

.submit-cart-btn {
  height: 2.6rem !important;
}

.k-alert {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  padding: 2px !important;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 97%;
  margin: 0.3rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 96, 58, 0.21);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.6px);
  -webkit-backdrop-filter: blur(10.6px);
  border: 1px solid rgba(0, 96, 58, 0.2);
}

.bottom-nav-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.bottom-nav-box span {
  color: #00603a;
  font-size: 13px;
}

.bottom-nav-box svg {
  filter: brightness(0) saturate(100%) invert(24%) sepia(22%) saturate(3635%)
    hue-rotate(125deg) brightness(99%) contrast(100%);
}

#menu-activator-desc {
  margin-right: auto;
}

.assets-price {
  font-size: 11px;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  background-color: #00603a;
  color: #fff;
  margin: 0 0.5rem;
}

.assets-gold {
  font-size: 11px;
  padding: 0.3rem 0.5rem;
  border-radius: 10px;
  background-color: #ceffeb;
  color: #00603a;
  margin: 0 0.5rem;
}

@media (min-width: 768px) {
  .assets-price {
    font-size: 14px;
  }

  .assets-gold {
    font-size: 14px;
  }
}
</style>
