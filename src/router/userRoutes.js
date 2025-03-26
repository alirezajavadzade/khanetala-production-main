export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/dashboard/DashboardView.vue'),
        meta: { layout: "DashboardLayout", transition: 'fade', requiresAuth: true },
    },
    {
        path: '/Bankinfo',
        name: 'Bankinfo',
        component: () => import('../views/dashboard/BankinfoView.vue'),
        meta: { layout: "DashboardLayout", transition: 'fade', requiresAuth: true },
    },
    {
        path: '/Goldbox',
        name: 'Goldbox',
        component: () => import('../views/dashboard/GoldboxView.vue'),
        meta: { layout: "DashboardLayout", transition: 'fade', requiresAuth: true },
    },
    {
        path: '/PersonalInfo',
        name: 'PersonalInfo',
        component: () => import('../views/dashboard/PersonalInfoView.vue'),
        meta: { layout: "DashboardLayout", transition: 'fade', requiresAuth: true },
    },
    {
        path: '/Transaction',
        name: 'Transaction',
        component: () => import('../views/dashboard/TransactionView.vue'),
        meta: { layout: "DashboardLayout", transition: 'fade', requiresAuth: true },
    },
    {
        path: '/GoldBoxNewView',
        name: 'GoldBoxNewView',
        component: () => import('../views/dashboard/GoldBoxNewView.vue'),
        meta: { layout: "DashboardLayout", transition: 'fade', requiresAuth: true },
    },
]