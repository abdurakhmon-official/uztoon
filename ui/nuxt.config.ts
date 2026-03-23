// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-03',
  devtools: { enabled: true },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "UzToon",
      meta: [
        {
          name: "name",
          content: "UzToon - O'zbek tilida WebToon",
        },
        {
          name: "description",
          content: "UzToon bu O'zbek tilidagi eng birinchi WebToonlar olami.",
        },
        {
          name: "keywords",
          content: "anime, webtoon, comics, uzbek",
        },
        {
          name: "image",
          content: "https://uztoon.netlify.app/favicon.png",
        },
      ],

      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.png",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap",
        },
      ],

      script: [
        {
          tagPosition: "bodyClose",
          src: "/assets/js/jquery-3.3.1.min.js",
          type: "text/javascript",
        },
        {
          tagPosition: "bodyClose",
          src: "/assets/js/bootstrap.min.js",
          type: "text/javascript",
        },
        {
          tagPosition: "bodyClose",
          src: "/assets/js/player.js",
          type: "text/javascript",
        },
        {
          tagPosition: "bodyClose",
          src: "/assets/js/mixitup.min.js",
          type: "text/javascript",
        },
        {
          tagPosition: "bodyClose",
          src: "/assets/js/jquery.slicknav.js",
          type: "text/javascript",
        },
        {
          tagPosition: "bodyClose",
          src: "/assets/js/owl.carousel.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  css: ["@/assets/styles/main.scss"],

  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      baseApiUrl: process.env.BASE_API_URL,
      apiBase: "/api",
    },
  },
});
