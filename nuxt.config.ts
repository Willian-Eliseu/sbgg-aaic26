// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@pinia/nuxt'],
  css: ['@/assets/scss/main.scss'],
  srcDir: 'app/',
  app: {
    head: {
      title: 'SBGG AAIC26',
      meta: [
        {
          name: 'description',
          content: 'Webinar SBGG AAIC26'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'favicon.ico'
        }
      ]
    },
    baseURL: '/sbgg-aaic26'
  },
  router: {
    options: {
      hashMode: false // set to false for SPA routing without hash
    }
  },
  ssr: false
})