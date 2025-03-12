<template>
  <component :is="currentLayout">
    <RouterView :key="route.fullPath" />
  </component>
</template>


<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue';
import DashboardLayout from './layout/DashboardLayout.vue';
import AuthenticationLayout from './layout/AuthenticationLayout.vue';
import DefaultLayout from './layout/DefaultLayout.vue';



const route = useRoute();
const layouts = {
  DashboardLayout,
  AuthenticationLayout,
  DefaultLayout
}


const currentLayout = computed(() => {
  const layoutName = route.meta.layout;
  return layouts[layoutName];
});


// const clearTokenAndLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("loginTime");
//   router.push('/login')
// };



onMounted(() => {
// const checkTokenExpiration = () => {
//   const loginTime = Number(localStorage.getItem('loginTime'));
//   if (!loginTime || isNaN(loginTime)) return;
//   if (Date.now() - loginTime > 60 * 60 * 1000) {
//     clearTokenAndLogout();
//   }
// };

// checkTokenExpiration();

// const intervalId = setInterval(checkTokenExpiration, 60 * 1000);

// onUnmounted(() => {
// clearInterval(intervalId);
//   });
});

</script>


<style scoped></style>
