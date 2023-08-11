// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Poppins: [400, 600, 700],
        },
      },
    ],
  ],
  css: ['@/assets/css/main.css'],
})
