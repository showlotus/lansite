import { rm } from 'fs/promises'
import puppeteerManager from './server/puppeteerManager'
import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: false,
  nitro: {
    output: {
      dir: 'dist',
    },
  },

  typescript: {
    shim: false,
  },

  modules: ['@nuxtjs/tailwindcss'],

  hooks: {
    close: () => puppeteerManager.closeBrowser(),
    'nitro:build:public-assets': async nitro => {
      const publicDir = path.resolve(nitro.options.output.dir, 'public')
      const excludeDirs = ['chrome-mac', 'chrome-win']
      for (const dir of excludeDirs) {
        const targetPath = path.resolve(publicDir, dir)
        console.log(targetPath)
        await rm(targetPath, { recursive: true, force: true })
      }
    },
  },

  devServer: {
    host: '0.0.0.0',
  },
})
