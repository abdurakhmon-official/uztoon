<template>
  <div class="row">
    <div
      class="col-12"
      v-for="(preview, index) in previews"
      :key="`preview-${index}`"
    >
      <div
        class="set-bg"
        :style="{
          'background-image': 'url(' + preview + ')',
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    serie: {
      type: Object,
    },
  },
  data(): any {
    return {
      previews: [],
    };
  },
  methods: {
    async setPreviews() {
      for (const img of this.serie.images) {
        const result = await generatePreview(img.image);
        this.previews.push(result);
      }
    },
  },
  created() {
    this.setPreviews();
  },
});
</script>

<style scoped>
.set-bg {
  background-size: contain;
  width: 100%;
  padding-top: 50%; /* (img-height / img-width * container-width) (853 / 1280 * 100) */
}
</style>
