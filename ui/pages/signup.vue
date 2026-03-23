<template>
  <common-breadcrumb title="Sign Up" description="Welcome to UzToon." />

  <section class="signup spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="login__form">
            <h3>Sign Up</h3>

            <form @submit.prevent="signupSubmit">
              <div class="input__item">
                <input
                  type="text"
                  placeholder="Your First Name"
                  v-model="firstName"
                  maxlength="20"
                  autocomplete="name"
                  required
                />
                <span class="icon_profile"></span>
              </div>

              <div class="input__item">
                <input
                  type="text"
                  placeholder="Your Last Name"
                  v-model="lastName"
                  maxlength="20"
                  autocomplete="family-name"
                  required
                />
                <span class="icon_profile"></span>
              </div>

              <div class="input__item">
                <input
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  maxlength="40"
                  autocomplete="email"
                  required
                />
                <span class="icon_mail"></span>
              </div>

              <div class="input__item">
                <input
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  maxlength="20"
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
                  autocomplete="new-password"
                  required
                />
                <span class="icon_lock"></span>
              </div>

              <button type="submit" class="site-btn" :disabled="loading">
                Register
              </button>
            </form>

            <h5>
              Already have an account?
              <nuxt-link to="/signin">Sign In!</nuxt-link>
            </h5>
          </div>
        </div>

        <div class="col-lg-6">
          <login-social-links>
            <h3>Sign In With:</h3>
          </login-social-links>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  setup() {
    const { signup, loggedIn } = useAuthStore();
    const router = useRouter();

    if (loggedIn) {
      router.push("/");
    }

    return {
      loading: false,
      v$: useVuelidate(),
      signup,
    };
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async signupSubmit() {
      const validation = await this.v$.$validate();
      if (validation) {
        this.loading = true;
        const response = await this.signup({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
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
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
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
