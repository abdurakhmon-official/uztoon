<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-right">
        <button
          type="button"
          class="site-btn mr-2"
          @click="() => loadMine(true)"
        >
          <span class="icon_loading"></span> Reload
        </button>
        <button type="button" class="site-btn" @click="createNew">
          Create New
        </button>
      </div>
    </div>

    <div class="row mt-3">
      <div
        class="col-lg-4 col-md-6 col-sm-6"
        v-for="item in mine"
        :key="`webtoon-item-${item.id}`"
      >
        <webtoon-card :item="item"></webtoon-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useWebtoonStore } from "@/store/webtoon";
import { storeToRefs } from "pinia";

export default defineComponent({
  async setup() {
    const webtoonStore = useWebtoonStore();
    const { loadMine } = webtoonStore;

    await loadMine();
    const { mine } = storeToRefs(webtoonStore);

    return {
      loading: false,
      mine,
      loadMine,
    };
  },
  methods: {
    createNew() {
      this.$router.push("/webtoon/create");
    },
  },
});
</script>

<style scoped>
label {
  color: #ffffffb2;
}
</style>
