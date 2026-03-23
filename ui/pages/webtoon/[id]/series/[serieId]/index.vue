<template>
  <div class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__links">
            <nuxt-link to="/"><i class="fa fa-home"></i> Home</nuxt-link>
            <nuxt-link :to="`/categories/${webtoon.category.id}`">
              {{ webtoon.category.name }}
            </nuxt-link>
            <nuxt-link :to="`/webtoon/${webtoon.id}`">
              {{ webtoon.title }}
            </nuxt-link>
            <span>{{ serie.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="anime-details spad">
    <div class="container">
      <div class="row">
        <div
          class="col-12"
          v-for="(img, index) in serie.images"
          :key="`serie-image-${index}`"
        >
          <div
            class="set-bg"
            :style="{
              'background-image': 'url(' + makeFullImageURL(img.image) + ')',
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { WebtoonService } from "~/services/webtoon.service";
import { SerieService } from "~/services/serie.service";

const config = useRuntimeConfig();

const route = useRoute();
const { id, serieId } = route.params;
const webtoonId = `${id}`;
const serId = `${serieId}`;

const { loggedIn, user } = useAuthStore();

const webtoon = await WebtoonService.get(webtoonId);

const isCreator = loggedIn && user?.id === webtoon.creator.id;

const { serie } = await SerieService.get(serId);

const title = "Uztoon - " + webtoon.title;
const description = webtoon.description;
const imageURL = makeFullImageURL(webtoon.image);

useSeoMeta({
  ogSiteName: title,
  ogType: "website",
  ogUrl: `${config.public.baseUrl}/webtoon/${webtoon.id}`,
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

<style scoped>
.set-bg {
  background-size: contain;
  width: 100%;
  padding-top: 100%; /* (img-height / img-width * container-width) (853 / 1280 * 100) */
}
</style>
