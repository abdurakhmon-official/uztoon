<template>
  <common-breadcrumb title="Forgot Password?" description="Sorry for you" />
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
