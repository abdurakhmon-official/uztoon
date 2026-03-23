<template>
  <div class="anime__details__sidebar" v-if="webtoons.length">
    <div class="section-title">
      <h5>You might like...</h5>
    </div>

    <div
      class="product__sidebar__view__item set-bg"
      v-for="(item, index) in webtoons"
      :key="`might-like-${index}`"
      :style="{
        'background-image': 'url(' + item.image + ')',
      }"
    >
      <div class="ep">{{ item.availableSeries }} / {{ item.totalSeries }}</div>
      <div class="view">
        <i class="fa fa-eye"></i>
        {{ new Intl.NumberFormat().format(item.views) }}
      </div>
      <h5>
        <nuxt-link :to="`/webtoon/${item.id}`">{{ item.title }}</nuxt-link>
      </h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WebtoonService } from "~/services/webtoon.service";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { webtoons } = await WebtoonService.mightLike(props.id);
</script>
