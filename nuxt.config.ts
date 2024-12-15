import puppeteerManager from './server/puppeteerManager'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: false,

  typescript: {
    shim: false,
  },

  modules: ['@nuxtjs/tailwindcss'],

  hooks: {
    close: () => puppeteerManager.closeBrowser(),
  },

  devServer: {
    host: '0.0.0.0',
  },
})
