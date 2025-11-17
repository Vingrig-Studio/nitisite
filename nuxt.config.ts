// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],
  
  app: {
    head: {
      title: 'Нити х Нити',
      meta: [
        { 
          name: 'description', 
          content: '«Нити х Нити» — музейный проект по созданию культурного творческого пространства на территории Арамильской суконной фабрики в городе Арамиль. Мы создали «Нити х Нити» в 2021 году, как память об Арамильской суконной фабрике братьев Злоказовых.' 
        }
      ]
    }
  },

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
