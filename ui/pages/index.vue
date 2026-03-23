<template>
  <main-hero />

  <section class="product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <main-webtoons
            v-for="card in MAIN_CARDS"
            :key="card.type"
            :type="card.type"
            :title="card.title"
          />
        </div>

        <div class="col-lg-4 col-md-6 col-sm-8">
          <main-sidebar />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const { setActivePage } = useStore();
    setActivePage("home");

    return {};
  },
});
</script>
