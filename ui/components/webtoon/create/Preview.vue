<template>
  <div class="container d-flex justify-content-center">
    <div class="product__item">
      <div
        class="product__item__pic set-bg"
        :style="{
          'background-image': 'url(' + preview + ')',
        }"
      >
        <div class="ep">{{ 1 }} / {{ webtoon.totalSeries }}</div>
        <div class="comment"><i class="fa fa-comments"></i> {{ 0 }}</div>
        <div class="view"><i class="fa fa-eye"></i> {{ 0 }}</div>
      </div>
      <div class="product__item__text">
        <ul v-if="webtoon.tags">
          <li
            v-for="(tag, index) in webtoon.tags"
            :key="`webtoon-tag-${index}`"
          >
            {{ tag.name }}
          </li>
        </ul>
        <h5>{{ webtoon.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    webtoon: {
      type: Object,
    },
  },
  data(): any {
    return {
      preview: null,
    };
  },
  methods: {
    async setPreview() {
      const result = await generatePreview(this.webtoon.image);
      this.preview = result;
    },
  },
  created() {
    this.setPreview();
  },
});
</script>

<style scoped>
.product__item {
  width: 260px;
}
.product__item__text ul li {
  background-color: #0b0c2a;
}
</style>
