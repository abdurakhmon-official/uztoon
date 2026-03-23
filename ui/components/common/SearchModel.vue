<template>
  <div class="search-model">
    <div class="h-100 d-flex align-items-center justify-content-center">
      <div class="search-close-switch" @click="close">
        <i class="icon_close"></i>
      </div>
      <form class="search-model-form" @submit.prevent="searchSubmit">
        <input
          type="text"
          placeholder="Search here....."
          v-model="search"
          :readonly="loading"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      loading: false,
      search: "",
    };
  },
  methods: {
    async searchSubmit() {
      console.log(this.search);
    },
    close() {
      $(".search-model").fadeOut(400, () => {
        this.search = "";
      });
    },
  },
  mounted() {
    // Search model
    $(".search-switch").on("click", function () {
      $(".search-model").fadeIn(400);
    });
  },
});
</script>
