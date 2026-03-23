<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-right">
        <button type="button" class="site-btn" @click="purchaseMore">
          Purchase More
        </button>
      </div>
    </div>

    <div class="row mt-3">
      <div
        class="col-lg-4 col-md-6 col-sm-6"
        v-for="(item, index) in purchases"
        :key="`webtoon-item-${index}`"
      >
        <webtoon-card :item="item"></webtoon-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useWebtoonStore } from "@/store/webtoon";

export default defineComponent({
  setup() {
    const { purchases } = useWebtoonStore();

    return {
      loading: false,
      purchases,
    };
  },
  methods: {
    purchaseMore() {
      this.$router.push("/");
    },
  },
});
</script>

<style scoped>
label {
  color: #ffffffb2;
}
</style>
