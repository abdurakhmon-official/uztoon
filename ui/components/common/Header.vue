<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="header__logo">
            <nuxt-link to="/">
              <img
                src="~/assets/images/logo.png"
                alt="UzToon Logo"
                style="height: 23px"
              />
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="header__nav">
            <nav class="header__menu mobile-menu">
              <ul>
                <li :class="{ active: activeMenu === 'home' }">
                  <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li :class="{ active: activeMenu === 'categories' }">
                  <nuxt-link @click="(event) => event.preventDefault()">
                    Categories
                  </nuxt-link>
                  <ul class="dropdown">
                    <li
                      v-for="(cat, index) in categories"
                      :key="`category-${index}`"
                    >
                      <nuxt-link :to="`/categories/${cat.id}`">
                        {{ cat.name }}
                      </nuxt-link>
                    </li>
                  </ul>
                </li>
                <li :class="{ active: activeMenu === 'blogs' }">
                  <nuxt-link to="/blog">Our Blog</nuxt-link>
                </li>
                <li><nuxt-link to="/">Contacts</nuxt-link></li>
                <li v-if="loggedIn">
                  <nuxt-link to="/user/my/profile">My Profile</nuxt-link>
                </li>
                <li v-else><nuxt-link to="/signin">Sign In</nuxt-link></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="col-lg-2">
          <div class="header__right">
            <div class="header__nav">
              <nav class="header__menu">
                <ul>
                  <li>
                    <a href="#" class="search-switch">
                      <span class="icon_search"></span>
                    </a>
                  </li>
                  <li>
                    <nuxt-link :to="loggedIn ? '/user/my/profile' : '/signin'">
                      <span class="icon_profile"></span>
                      <span class="arrow_carrot-down" v-if="loggedIn"></span>
                    </nuxt-link>
                    <ul class="dropdown" v-if="loggedIn">
                      <li>
                        <nuxt-link to="/user/my/profile">My Profile</nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/user/my/purchases">
                          My Purchases
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/user/my/webtoons">
                          My Webtoons
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/user/my/followings">
                          My Followings
                        </nuxt-link>
                      </li>
                      <li>
                        <a href="#" @click.prevent="signout">Sign Out</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div id="mobile-menu-wrap"></div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useStore();
    const { activeMenu, categories } = storeToRefs(store);

    const authStore = useAuthStore();
    const { signout } = authStore;
    const { loggedIn, user } = storeToRefs(authStore);

    return { activeMenu, categories, loggedIn, user, signout };
  },
  mounted() {
    /*------------------
      Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
      prependTo: "#mobile-menu-wrap",
      allowParentLinks: true,
    });
  },
});
</script>
