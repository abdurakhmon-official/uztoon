<template>
  <div
    class="product__pagination"
    :class="{ 'd-flex justify-content-center': center }"
  >
    <a href="#" v-if="!showingPages.includes(1)" @click.prevent="changePage(1)">
      <i class="fa fa-angle-double-left"></i>
    </a>

    <a
      href="#"
      v-for="page in showingPages"
      :key="page"
      :class="{ 'current-page': currentPage === page }"
      @click.prevent="changePage(page)"
    >
      {{ page }}
    </a>

    <a
      href="#"
      v-if="!showingPages.includes(pageCount)"
      @click.prevent="changePage(pageCount)"
    >
      <i class="fa fa-angle-double-right"></i>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 9,
    },
    totalCount: {
      type: Number,
      default: 1,
    },
    center: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["on-page-change"],
  computed: {
    pageCount(): number {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    showingPages(): number[] {
      const pages: number[] = [this.currentPage];

      while (this.currentPage - pages[0] < 2 && pages[0] - 1 > 0) {
        pages.unshift(pages[0] - 1);
      }

      while (
        pages.length < 5 &&
        pages[pages.length - 1] + 1 <= this.pageCount
      ) {
        pages.push(pages[pages.length - 1] + 1);
      }

      while (pages.length < 5 && pages[0] - 1 > 0) {
        pages.unshift(pages[0] - 1);
      }

      return pages;
    },
  },
  methods: {
    changePage(page: number): void {
      if (this.currentPage !== page) {
        this.$emit("on-page-change", page);
      }
    },
  },
});
</script>
