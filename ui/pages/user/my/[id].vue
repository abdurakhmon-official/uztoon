<template>
  <div class="container mt-5 mb-5">
    <div class="row no-gutters">
      <div class="col-md-4 col-lg-4">
        <div
          class="set-bg"
          :key="profileImage"
          :style="{
            'background-image':
              'url(' +
              (profileImage
                ? makeFullImageURL(profileImage)
                : '/uztoon-safe.png') +
              ')',
          }"
        ></div>
      </div>

      <div class="col-md-8 col-lg-8">
        <div class="d-flex flex-column">
          <div
            class="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white"
          >
            <h3 class="display-6">{{ fullName }}</h3>
            <i class="fa fa-facebook"></i>
            <i class="fa fa-google"></i>
            <i class="fa fa-youtube-play"></i>
            <i class="fa fa-dribbble"></i>
            <i class="fa fa-linkedin"></i>
          </div>
          <div class="p-3 bg-black text-white">
            <h6>Supper &amp; Dupper Creator</h6>
          </div>
          <div class="d-flex flex-row text-white">
            <div class="p-4 bg-primary text-center skill-block">
              <h4>90%</h4>
              <h6>Creativity</h6>
            </div>
            <div class="p-4 bg-success text-center skill-block">
              <h4>70%</h4>
              <h6>Something</h6>
            </div>
            <div class="p-4 bg-warning text-center skill-block">
              <h4>80%</h4>
              <h6>Something</h6>
            </div>
            <div class="p-4 bg-danger text-center skill-block">
              <h4>75%</h4>
              <h6>Something</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg-4 col-md-4 col-sm-4">
        <div class="row">
          <div class="col-12">
            <nuxt-link
              to="/user/my/profile"
              class="primary-btn pl-1 w-100"
              :class="{ active: page === 'profile' }"
            >
              My Profile
              <span class="arrow_right" v-if="page === 'profile'"></span>
            </nuxt-link>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <nuxt-link
              to="/user/my/purchases"
              class="primary-btn pl-1 w-100"
              :class="{ active: page === 'purchases' }"
            >
              My Purchases
              <span class="arrow_right" v-if="page === 'purchases'"></span>
            </nuxt-link>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <nuxt-link
              to="/user/my/webtoons"
              class="primary-btn pl-1 w-100"
              :class="{ active: page === 'webtoons' }"
            >
              My Webtoons
              <span class="arrow_right" v-if="page === 'webtoons'"></span>
            </nuxt-link>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <nuxt-link
              to="/user/my/followings"
              class="primary-btn pl-1 w-100"
              :class="{ active: page === 'followings' }"
            >
              My Followings
              <span class="arrow_right" v-if="page === 'followings'"></span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8">
        <component :is="currentPage" :userToEdit="userToEdit"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import MyProfile from "@/components/user/MyProfile.vue";
import MyWebtoons from "@/components/user/MyWebtoons.vue";
import MyPurchases from "@/components/user/MyPurchases.vue";
import MyFollowings from "@/components/user/MyFollowings.vue";

export default defineComponent({
  async setup() {
    const route = useRoute();

    definePageMeta({ middleware: "auth", scrollToTop: false });

    const authStore = useAuthStore();
    const { me } = authStore;
    const { fullName, profileImage, userToEdit } = storeToRefs(authStore);

    await me();

    return {
      page: route.params.id,
      fullName,
      profileImage,
      userToEdit,
    };
  },
  components: {
    MyProfile,
    MyWebtoons,
    MyPurchases,
    MyFollowings,
  },
  computed: {
    currentPage() {
      return `my-${this.page}`;
    },
  },
});
</script>

<style scoped>
.set-bg {
  height: 100%;
  min-height: 200px;
  position: relative;

  background-position: center;
}

.bg-black {
  background: #000;
}

.skill-block {
  width: 30%;
}

.active {
  background: #e53637;
  color: #ffffff;
  padding: 10px;
}
</style>
