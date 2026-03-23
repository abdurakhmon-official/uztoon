<template>
  <div class="rating" v-if="!upHere" @mouseover="upHere = true">
    <a href="#" v-for="star in 5" :key="star">
      <i
        class="fa"
        :class="{
          'fa-star': averageRate >= star,
          'fa-star-o': averageRate < star - 0.5,
          'fa-star-half-o': averageRate == star - 0.5,
        }"
      ></i>
    </a>
  </div>
  <div class="rating" v-else @mouseleave="upHere = false">
    <a
      href="#"
      v-for="star in 5"
      :key="star"
      @mouseover="upStar = star"
      @mouseleave="upStar = 0"
      @click.prevent="rate(star)"
    >
      <i
        class="fa"
        :class="{
          'fa-star': upHere && upStar >= star,
          'fa-star-o': !upHere || upStar < star,
        }"
      ></i>
    </a>
  </div>
  <span> {{ new Intl.NumberFormat().format(rateCount) }} Votes </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WebtoonRateService } from "~/services/webtoon-rate.service";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  setup(): any {
    const { loggedIn } = useAuthStore();

    return {
      loggedIn,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,

      upHere: false,
      upStar: 0,

      averageRate: 0,
      rateCount: 0,
    };
  },
  methods: {
    async loadRate() {
      const { rate, rateCount } = await WebtoonRateService.get(this.id);
      this.averageRate = rate;
      this.rateCount = rateCount;
    },
    async rate(newRate: number) {
      if (!this.loggedIn) {
        this.$toast.info("Please sign in first to rate");
        return;
      }
      if (this.loading) return;

      this.loading = true;
      const { rate, rateCount } = await WebtoonRateService.rate(
        this.id,
        newRate
      );
      this.averageRate = rate;
      this.rateCount = rateCount;

      this.loading = false;
    },
  },
  created() {
    this.loadRate();
  },
});
</script>
