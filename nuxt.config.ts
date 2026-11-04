// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
  ],

  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-free/css/all.min.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  app: {
    head: {
      title: 'Aksata',
      titleTemplate: '%s  | RSUD Dr. Soetomo',

      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/rsds-icon.ico'
        }
      ],

      meta: [
        {
          name: 'description',
          content: 'Aksata RSUD Dr. Soetomo'
        }
      ]
    }
  }
})
