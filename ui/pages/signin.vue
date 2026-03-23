<template>
  <common-breadcrumb title="Sign in" description="Welcome to UzToon." />

  <section class="login spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="login__form">
            <h3>Sign in</h3>

            <form @submit.prevent="signinSubmit">
              <div class="input__item">
                <input
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  maxlength="40"
                  autocomplete="username"
                  required
                />
                <span class="icon_profile"></span>
              </div>

              <div class="input__item">
                <input
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  minlength="8"
                  maxlength="16"
                  autocomplete="current-password"
                  required
                />
                <span class="icon_lock"></span>
              </div>

              <button type="submit" class="site-btn" :disabled="loading">
                Sign in Now
              </button>
            </form>

            <nuxt-link to="/forgot-password" class="forget_pass">
              Forgot Your Password?
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="login__register">
            <h3>Don’t Have An Account?</h3>
            <nuxt-link to="/signup" class="primary-btn">
              Register Now
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="login__social">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-6">
            <login-social-links>
              <span>or</span>
            </login-social-links>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  setup(): any {
    const { signin, loggedIn } = useAuthStore();
    const router = useRouter();

    if (loggedIn) {
      router.push("/");
    }

    return {
      loading: false,
      v$: useVuelidate(),
      signin,
    };
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async signinSubmit() {
      const validation = await this.v$.$validate();
      if (validation) {
        this.loading = true;
        const response = await this.signin({
          username: this.username,
          password: this.password,
        });
      } else {
        this.$toast.error("Please, check all fields!");
      }
      this.loading = false;
    },
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
});
</script>
