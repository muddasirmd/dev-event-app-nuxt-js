// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '~/assets/css/global.css' // path to your global CSS
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxt/image'],

  runtimeConfig: {
    // Server-only
    mongodbUri: process.env.MONGODB_URI,

    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
    }
  }
})