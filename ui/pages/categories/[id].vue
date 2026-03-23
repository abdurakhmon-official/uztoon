<template>
  <div class="breadcrumb-option">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="breadcrumb__links">
            <nuxt-link to="/"><i class="fa fa-home"></i> Home</nuxt-link>
            <span>{{ category?.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="product-page spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="product__page__content">
            <div class="product__page__title">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-6">
                  <div class="section-title">
                    <h4>{{ category?.name }}</h4>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6">
                  <div class="product__page__filter">
                    <p>Order by:</p>
                    <select @change="onSortChange($event)">
                      <option
                        v-for="(sorting, index) in sortings"
                        :key="`sorting-${index}`"
                        :value="JSON.stringify(sorting)"
                      >
                        {{ sorting.text }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div
                class="col-lg-4 col-md-6 col-sm-6"
                v-for="(item, index) in items"
                :key="`webtoon-item-${index}`"
              >
                <webtoon-card :item="item"></webtoon-card>
              </div>
            </div>
          </div>

          <base-pagination
            :current-page="search.page"
            :page-size="search.size"
            :total-count="totalCount"
            @on-page-change="goToPage"
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
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { WebtoonService } from "~/services/webtoon.service";
import type { BasicSearch } from "~/types/input/BasicSearch";

export default defineComponent({
  setup() {
    const config = useRuntimeConfig();

    const { setActivePage, getCategoryById } = useStore();
    setActivePage("categories");

    const route = useRoute();
    const { id } = route.params;

    const category = getCategoryById(id);

    const items = ref([]);

    const title = "Uztoon - " + category.name;
    const description = "Uztoon - " + category.name + " webtoons";
    const imageURL = `${config.public.baseUrl}/favicon.png`;

    useSeoMeta({
      ogSiteName: title,
      ogType: "website",
      ogUrl: `${config.public.baseUrl}/categories/${category.id}`,
      ogTitle: title,
      ogDescription: description,
      ogImage: imageURL,

      title: title,
      description: description,
      twitterCard: "summary_large_image",
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: imageURL,
    });

    return {
      category,
      items,
    };
  },
  data() {
    return {
      sortings: [
        { sort: "createdAt", direction: "desc", text: "Newest" },
        { sort: "createdAt", direction: "asc", text: "Oldest" },
        { sort: "title", direction: "asc", text: "A-Z" },
        { sort: "title", direction: "desc", text: "Z-A" },
      ],

      totalCount: 1,
      search: {
        page: 1,
        size: 9,
        sort: "createdAt",
        direction: "desc",
      },
    };
  },
  methods: {
    async loadWebtoons() {
      const { webtoons, count } = await WebtoonService.loadByCategory(
        this.category.id,
        this.search as BasicSearch
      );
      this.items = webtoons;
      this.totalCount = count;
    },
    async goToPage(page: number) {
      this.search.page = page;
      await this.loadWebtoons();
    },
    async onSortChange(event: Event) {
      const sortingValue = JSON.parse(
        (event.target as HTMLSelectElement).value
      );

      if (
        this.search.sort !== sortingValue.sort ||
        this.search.direction !== sortingValue.direction
      ) {
        this.search.page = 1;
        this.search.sort = sortingValue.sort;
        this.search.direction = sortingValue.direction;
        await this.loadWebtoons();
      }
    },
  },
  created() {
    this.loadWebtoons();
  },
});
</script>
