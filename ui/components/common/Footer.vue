<template>
  <footer class="footer">
    <div class="page-up">
      <a href="#" id="scrollToTopButton" @click.prevent="goToTop">
        <span class="arrow_carrot-up"></span>
      </a>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="footer__logo">
            <nuxt-link to="/">
              <img
                src="~/assets/images/logo.png"
                alt="UzToon Logo"
                style="height: 23px"
              />
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="footer__nav">
            <ul>
              <li class="active"><nuxt-link to="/">Home</nuxt-link></li>
              <li><nuxt-link to="/blog">Our Blog</nuxt-link></li>
              <li><nuxt-link to="/">Contacts</nuxt-link></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <p>
            Copyright &copy;{{ currentYear }}
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    goToTop() {
      /*------------------
        Scroll To Top
      --------------------*/
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    },
  },
});
</script>
