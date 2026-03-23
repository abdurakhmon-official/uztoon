<template>
  <div class="login__social__links">
    <slot />
    <ul>
      <li>
        <a href="#" class="facebook">
          <i class="fa fa-facebook"></i> Sign in With Facebook
        </a>
      </li>
      <li>
        <a href="#" class="google">
          <i class="fa fa-google"></i> Sign in With Google
        </a>
      </li>
      <li>
        <a href="#" class="twitter">
          <i class="fa fa-twitter"></i> Sign in With Twitter
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
