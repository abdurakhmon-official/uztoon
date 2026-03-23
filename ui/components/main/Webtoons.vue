<template>
  <div :class="`${type}__product`" v-if="items.length">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-8">
        <div class="section-title">
          <h4>{{ title }}</h4>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4">
        <div class="btn__all">
          <nuxt-link :to="`/main/${type}`" class="primary-btn">
            View All <span class="arrow_right"></span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-sm-6"
        v-for="(item, index) in items"
        :key="`webtoon-item-${index}`"
      >
        <webtoon-card :item="item"></webtoon-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebtoonStore } from "@/store/webtoon";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const { type } = props;
const { getByType } = useWebtoonStore();
const items = await getByType(type);
</script>
