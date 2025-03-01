import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'خانه طلا',
        short_name: 'خانه طلا',
        description: 'سامانه سرمایه گذاری طلا',
        theme_color: '#ffffff',
        start_url: "/",
        display: "standalone",
        icons: [
          {
            "src": "/icons/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/icons/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        categories: ["finance", "productivity", "business"],
        orientation: "portrait",
        lang: "fa-IR",
        dir: "rtl",
        iarc_rating_id: "e10e9a3d-86e3-41c0-a0e1-2b3e4c0c42d7",
        prefer_related_applications: false,
        related_applications: [],
        scope: "/",
        launch_handler: {
          "client_mode": "navigate-new"
        },
        scope_extensions: [
          {
            "origin": "https://example.com",
            "scope": "/gold-prices/*"
          }
        ],
        id: "/?source=pwa"
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
