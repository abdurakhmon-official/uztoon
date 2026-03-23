<template>
  <client-only>
    <div class="anime__details__review" v-if="reviews.length">
      <div class="section-title">
        <h5>Reviews</h5>
      </div>
      <div
        class="anime__review__item"
        v-for="(rw, index) in reviews"
        :key="`review-${index}`"
      >
        <div class="anime__review__item__pic">
          <img
            :src="
              rw.author.profileImage
                ? makeFullImageURL(rw.author.profileImage)
                : '/uztoon-safe.png'
            "
            :alt="rw.author.fullName"
          />
        </div>
        <div class="anime__review__item__text">
          <h6>
            {{ rw.author.fullName }} -
            <span>{{ timeToString(rw.createdAt) }} ago</span>
          </h6>
          <p>{{ rw.review }}</p>
        </div>
      </div>

      <base-pagination
        :current-page="search.page"
        :page-size="search.size"
        :total-count="totalCount"
        @on-page-change="goToPage"
        :center="false"
      />
    </div>
    <div class="anime__details__form">
      <div class="section-title">
        <h5>Your Comment</h5>
      </div>
      <form @submit.prevent="saveReview">
        <textarea
          ref="reviewInput"
          placeholder="Your Comment"
          v-model="review"
          @keyup="onCtrlEnter"
        ></textarea>
        <button type="submit" :disabled="loading">
          <i class="fa fa-location-arrow"></i> Review
        </button>
      </form>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WebtoonReviewService } from "~/services/webtoon-review.service";
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
  data(): any {
    return {
      loading: false,
      review: "",

      reviews: [],

      totalCount: 1,
      search: {
        page: 1,
        size: 5,
      },
    };
  },
  methods: {
    async loadReviews() {
      const { reviews, count } = await WebtoonReviewService.get(
        this.id,
        this.search
      );
      this.reviews = reviews;
      this.totalCount = count;
    },
    async goToPage(page: number) {
      this.search.page = page;
      await this.loadReviews();
    },
    async saveReview() {
      if (!this.loggedIn) {
        this.$toast.info("Please sign in first to leave the review");
        return;
      }
      if (this.loading) return;

      this.loading = true;
      const { success } = await WebtoonReviewService.create(this.id, {
        review: this.review,
      });
      await this.goToPage(1);
      this.loading = false;
      this.review = "";
      this.$refs.reviewInput.scrollIntoView({ behavior: "smooth" });
      this.$refs.reviewInput.focus();
    },
    async onCtrlEnter($event: KeyboardEvent) {
      if (($event.keyCode == 10 || $event.keyCode == 13) && $event.ctrlKey) {
        this.saveReview();
      }
    },
  },
  created() {
    this.loadReviews();
  },
});
</script>
