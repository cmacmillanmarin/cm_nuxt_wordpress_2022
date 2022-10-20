require('dotenv').config({
  path: `./config/env/.env.${process.env.ENV}`,
})

const { WP_BASE_URL, WP_REST_API_BASE_URL } = process.env

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      WP_REFRESH_VALUE: Date.now(),
      WP_BASE_URL: WP_BASE_URL,
      WP_AUTH_API_BASE_URL: `${WP_BASE_URL + WP_REST_API_BASE_URL}/jwt-auth/v1`,
      WP_REST_API_BASE_URL: `${WP_BASE_URL + WP_REST_API_BASE_URL}/wp/v2`,
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
  generate: {
    routes: ['/admin/docs', '/admin/preview', '/admin/deploy'],
  },
})
