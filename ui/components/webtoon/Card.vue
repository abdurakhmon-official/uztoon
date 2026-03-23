<template>
  <div class="product__item">
    <nuxt-link :to="`/webtoon/${item.id}`">
      <div
        class="product__item__pic set-bg"
        :style="{
          'background-image': 'url(' + makeFullImageURL(item.image) + ')',
        }"
      >
        <div class="ep">
          {{ item.availableSeries }} / {{ item.totalSeries }}
        </div>
        <div class="comment">
          <i class="fa fa-comments"></i> {{ item.reviewCount }}
        </div>
        <div class="view">
          <i class="fa fa-eye"></i> {{ item.purchaseCount }}
        </div>
      </div>
    </nuxt-link>
    <div class="product__item__text">
      <ul v-if="item.tags">
        <li v-for="(tag, index) in item.tags" :key="`item-tag-${index}`">
          {{ tag.name }}
        </li>
      </ul>
      <h5>
        <nuxt-link :to="`/webtoon/${item.id}`">{{ item.title }}</nuxt-link>
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
