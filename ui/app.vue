<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const title = "UzToon - O'zbek tilida WebToon";
const description = "UzToon bu O'zbek tilidagi eng birinchi WebToonlar olami.";
const imageURL = `${config.public.baseUrl}/favicon.png`;

useSeoMeta({
  ogSiteName: title,
  ogType: "website",
  ogUrl: config.public.baseUrl,
  ogTitle: title,
  ogDescription: description,
  ogImage: imageURL,

  title: title,
  description: description,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: imageURL,
});
</script>
