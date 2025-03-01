import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import errorRoutes from './errorRoutes';

const routes = [
  ...authRoutes,
  ...userRoutes,
  ...errorRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
