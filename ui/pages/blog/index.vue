<template>
  <common-breadcrumb
    background="/assets/images/normal-breadcrumb.jpg"
    title="Our Blog"
    description="Welcome to the official UzToon blog"
  />

  <section class="blog spad">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6"
          v-for="(chunk, index) in chunks"
          :key="`chunk-${index}`"
        >
          <div class="row">
            <div
              v-for="(item, ind) in chunk"
              :key="`blog-item-${ind}`"
              :class="
                (ind + index) % 3 === 0
                  ? 'col-lg-12'
                  : 'col-lg-6 col-md-6 col-sm-6'
              "
            >
              <div
                class="blog__item set-bg"
                :class="(ind + index) % 3 === 0 ? '' : 'small__item'"
                :style="{
                  'background-image': 'url(' + item.image + ')',
                }"
              >
                <div class="blog__item__text">
                  <p>
                    <span class="icon_calendar"></span>
                    {{ dateFormatter(item.createdAt) }}
                  </p>
                  <h4>
                    <nuxt-link :to="`/blog/${item.id}`">
                      {{ item.title }}
                    </nuxt-link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { useBlogStore } from "@/store/blog";

export default defineComponent({
  setup() {
    const { setActivePage } = useStore();
    setActivePage("blogs");

    const { blogs } = useBlogStore();
    return { blogs };
  },
  computed: {
    chunks() {
      const result = [];
      const chunkSize = 6;
      for (let i = 0; i < this.blogs.length; i += chunkSize) {
        const chunk = this.blogs.slice(i, i + chunkSize);
        result.push(chunk);
      }
      return result;
    },
  },
  methods: {
    dateFormatter(date) {
      const formattedDate = new Date(date).toLocaleDateString(
        {},
        { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
      );
      const sp = formattedDate.replaceAll(",", "").split(" ");
      return `${sp[1]} ${sp[0]}, ${sp[2]}`;
    },
  },
});
</script>
