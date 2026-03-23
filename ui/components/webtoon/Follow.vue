<template>
  <a
    v-if="!following"
    href="#"
    class="follow-btn unfollowing"
    @click.prevent="follow"
  >
    <i class="fa fa-heart-o"></i> Follow
  </a>
  <a v-else href="#" class="follow-btn" @click.prevent="unfollow">
    <i class="fa fa-heart"></i> Following
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/store/auth";
import { WebtoonFollowingService } from "~/services/webtoon-following.service";

export default defineComponent({
  setup() {
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
      following: false,
    };
  },
  methods: {
    async loadFollowing() {
      const { following } = await WebtoonFollowingService.get(this.id);
      if (following) this.following = true;
    },
    async follow() {
      if (!this.loggedIn) {
        this.$toast.info("Please sign in first");
        return;
      }

      const { success } = await WebtoonFollowingService.follow(this.id);
      if (success) this.following = true;
    },
    async unfollow() {
      if (!this.loggedIn) {
        this.$toast.info("Please sign in first");
        return;
      }

      const { success } = await WebtoonFollowingService.unfollow(this.id);
      if (success) this.following = false;
    },
  },
  created() {
    if (this.loggedIn) {
      this.loadFollowing();
    }
  },
});
</script>

<style scoped>
.unfollowing {
  background-color: #343a40;
}
</style>
