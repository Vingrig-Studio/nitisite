// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],

  // routeRules: {
  //   '/**': { prerender: true },
  // },
  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: [],
  //   },
  // },
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/main.scss";',
        },
      },
    },
  },
})
