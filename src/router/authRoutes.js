export default [
    {
        path: '/Login',
        name: 'Login',
        component: () => import('../views/auth/LoginView.vue'),
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },
    {
        path: '/OTP',
        name: 'OTP',
        component: () => import('../views/auth/OTPView.vue'),
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },
    {
        path: '/Identity',
        name: 'Identity',
        component: () => import('../views/auth/IdentityView.vue'),
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },
    {
        path: '/IdentityInfo',
        name: 'IdentityInfo',
        component: () => import('../views/auth/identityInfoView.vue'),
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },

]