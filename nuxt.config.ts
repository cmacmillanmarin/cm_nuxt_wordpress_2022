require('dotenv').config({
  path: `./config/env/.env.${process.env.ENV}`,
})

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      WP_BASE_URL: process.env.WP_BASE_URL,
      WP_REST_API_BASE_URL: process.env.WP_REST_API_BASE_URL,
      WP_DEFAULT_LANG: process.env.WP_DEFAULT_LANG,
    },
  },
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_main.scss" as *;',
        },
      },
    },
  },
})
