<template>
  <div class="product__sidebar">
    <div class="product__sidebar__view" v-if="topViews.length">
      <div class="section-title">
        <h5>Top Views</h5>
      </div>
      <ul class="filter__controls">
        <li
          v-for="fltr in filters"
          :key="fltr.key"
          :data-filter="fltr.filter"
          :class="{ active: filter === fltr.key }"
          @click="filter = fltr.key"
        >
          {{ fltr.text }}
        </li>
      </ul>

      <div class="filter__gallery">
        <div
          v-for="(item, index) in topViews"
          :key="`top-view-${index}`"
          class="product__sidebar__view__item set-bg"
          :class="item.periods.join(' ')"
          :style="{
            'background-image': 'url(' + makeFullImageURL(item.image) + ')',
          }"
        >
          <div class="ep">
            {{ item.availableSeries }} / {{ item.totalSeries }}
          </div>
          <div class="view">
            <i class="fa fa-eye"></i> {{ item.purchaseCount }}
          </div>
          <h5>
            <nuxt-link :to="`/webtoon/${item.id}`">{{ item.title }}</nuxt-link>
          </h5>
        </div>
      </div>
    </div>

    <div class="product__sidebar__comment" v-if="false">
      <div class="section-title">
        <h5>New Comment</h5>
      </div>
      <div
        class="product__sidebar__comment__item"
        v-for="(item, index) in newComments"
        :key="`top-view-${index}`"
      >
        <div class="product__sidebar__comment__item__pic">
          <img :src="item.image" alt="" />
        </div>
        <div class="product__sidebar__comment__item__text">
          <ul>
            <li
              class="mr-1"
              v-for="(tag, index) in item.tags"
              :key="`item-tag-${index}`"
            >
              {{ tag.name }}
            </li>
          </ul>
          <h5>
            <nuxt-link :to="`/webtoon/${item.id}`">{{ item.title }}</nuxt-link>
          </h5>
          <span>
            <i class="fa fa-eye"></i>
            {{ new Intl.NumberFormat().format(item.views) }} Viewes
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useWebtoonStore } from "@/store/webtoon";

export default defineComponent({
  setup() {
    const { getByType, newComments } = useWebtoonStore();
    return { getByType, newComments };
  },
  data() {
    return {
      filters: [
        {
          key: "all",
          text: "All",
          filter: "*",
        },
        {
          key: "day",
          text: "Day",
          filter: ".day",
        },
        {
          key: "week",
          text: "Week",
          filter: ".week",
        },
        {
          key: "month",
          text: "Month",
          filter: ".month",
        },
        {
          key: "year",
          text: "Year",
          filter: ".year",
        },
      ],
      filter: "all",

      topViews: [],
    };
  },
  methods: {
    async loadTopViews() {
      const items = await this.getByType("top-views");
      this.topViews = items;
    },
    async initFilter() {
      await nextTick(() => {
        if ($(".filter__gallery").length > 0) {
          var containerEl = document.querySelector(".filter__gallery");
          var mixer = mixitup(containerEl);
        }
      });
    },
  },
  created() {
    this.loadTopViews();
  },
  mounted() {
    this.initFilter();
  },
});
</script>

<style scoped>
.set-bg {
  background-position: center;
}

.filter__gallery h5 a {
  color: #0b0c2a;
}
</style>
