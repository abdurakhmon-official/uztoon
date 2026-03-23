<template>
  <section
    class="normal-breadcrumb set-bg"
    :style="{ 'background-image': 'url(' + background + ')' }"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <div class="normal__breadcrumb__text">
            <h2>{{ title }}</h2>
            <p v-if="description">{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    background: {
      type: String,
      default: "/assets/images/normal-breadcrumb.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
});
</script>
