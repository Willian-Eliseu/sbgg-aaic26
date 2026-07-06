// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@pinia/nuxt'],
  css: ['@/assets/scss/main.scss'],
  srcDir: 'app/',
  app: {
    baseURL: '/sbgg-aaic26/',
  },
  router: {
    options: {
      hashMode: false // set to false for SPA routing without hash
    }
  }
})