require('dotenv').config({ path: `./config/env/.env.private` })
require('dotenv').config({ path: `./config/env/.env.${process.env.ENV}` })

const {
  ENV,
  FE_BASE_URL,
  WP_BASE_URL,
  VERCEL_API_BASE_URL,
  VERCEL_API_TOKEN,
  VERCEL_PROJECT_ID,
  VERCEL_DEPLOY_LINK,
} = process.env

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    VERCEL_API_TOKEN: VERCEL_API_TOKEN,
    VERCEL_PROJECT_ID: VERCEL_PROJECT_ID,
    VERCEL_DEPLOY_LINK: VERCEL_DEPLOY_LINK,
    public: {
      IS_DEV: ENV == 'dev',
      FE_BASE_URL: FE_BASE_URL,
      WP_REFRESH_VALUE: Date.now(),
      WP_BASE_URL: WP_BASE_URL,
      WP_AUTH_API_BASE_URL: `${WP_BASE_URL}/wp-json/jwt-auth/v1`,
      WP_REST_API_BASE_URL: `${WP_BASE_URL}/wp-json/wp/v2`,
      VERCEL_API_BASE_URL: VERCEL_API_BASE_URL,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt Wordpress CMS',
      meta: [
        {
          name: 'description',
          content:
            'Frontend powered by Vue, statically generated by Nuxt js and hosted in Vercel. Headless CMS by Wordpress hosted in SiteGround.',
        },
        { name: 'og:locale', content: 'en' },
        { name: 'description', content: 'Homepage description' },
        { name: 'og:locale', content: 'en' },
        { name: 'og:title', content: 'Homepage' },
        { name: 'og:description', content: 'Homepage description' },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: FE_BASE_URL },
        { name: 'og:image', content: '' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Homepage' },
        { name: 'twitter:description', content: 'Homepage description' },
        { name: 'twitter:image', content: '' },
      ],
      script: [],
    },
  },

  components: {
    dirs: [
      {
        path: '~/components/global',
        global: true,
      },
      '~/components',
    ],
  },

  modules: ['@pinia/nuxt', '@nuxt/content'],

  css: ['@/assets/css/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/css/_mixins.scss";
          `,
        },
      },
    },
  },
})
