<template>
  <section class="hero">
    <div class="container">
      <div class="hero__slider owl-carousel">
        <div
          class="hero__items set-bg"
          v-for="item in hero"
          :key="`hero-${item.id}`"
          :style="{ 'background-image': 'url(' + item.image + ')' }"
        >
          <div class="row">
            <div class="col-lg-6">
              <div class="hero__text">
                <div class="label">{{ item.category.name }}</div>
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <nuxt-link :to="`/`">
                  <span>Check It Now</span> <i class="fa fa-angle-right"></i>
                </nuxt-link>
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
import { useWebtoonStore } from "@/store/webtoon";

export default defineComponent({
  setup() {
    const { hero } = useWebtoonStore();
    return { hero };
  },
  methods: {
    initHero() {
      /*------------------
        Hero Slider
      --------------------*/
      const hero_s = $(".hero__slider");
      hero_s.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        nav: true,
        navText: [
          "<span class='arrow_carrot-left'></span>",
          "<span class='arrow_carrot-right'></span>",
        ],
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false,
      });
    },
  },
  mounted() {
    this.initHero();
  },
});
</script>
