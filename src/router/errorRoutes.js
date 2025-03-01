export default [
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/error/404.vue'),
        meta: { layout: "DefaultLayout", transition: 'fade' },
    },
    {
        path: '/failed',
        name: 'failed',
        component: () => import('../views/payment/failed.vue'),
        meta: { layout: "DefaultLayout", transition: 'fade' },
    },
    {
        path: '/success',
        name: 'success',
        component: () => import('../views/payment/success.vue'),
        meta: { layout: "DefaultLayout", transition: 'fade' },
    }

]