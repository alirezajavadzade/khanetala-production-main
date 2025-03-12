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

</script>


<style scoped></style>
