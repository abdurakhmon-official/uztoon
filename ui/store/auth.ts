import { defineStore } from "pinia";
import { AuthService } from "~/services/auth.service";
import type { AuthStoreShape } from "~/types";
import type { SigninInput } from "~/types/input/SigninInput";
import type { SignupInput } from "~/types/input/SignupInput";
import type { UpdateUserInput } from "~/types/input/UpdateUserInput";

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreShape => ({
    user: null,
    token: null,
  }),
  getters: {
    loggedIn: (state) => state.user && state.token,
    fullName: (state) => state.user?.fullName,
    profileImage: (state) => state.user?.profileImage,
    userToEdit: (state) => ({
      firstName: state.user?.firstName,
      lastName: state.user?.lastName,
      email: state.user?.email,
      username: state.user?.username,
      phone: state.user?.phone,
      country: state.user?.country,
      region: state.user?.region,
    }),
  },
  actions: {
    async signup(signupForm: SignupInput) {
      const router = useRouter();
      const result = await AuthService.signup(signupForm);
      if (result) {
        setTimeout(() => {
          router.push("/signin");
        }, 300);
      }
    },
    async signin(signinForm: SigninInput) {
      const router = useRouter();
      const { token, user } = await AuthService.signin(signinForm);
      this.token = token;
      this.user = user;

      setTimeout(() => {
        router.push("/");
      }, 300);
    },
    async me(force = false) {
      if (!force && this.loggedIn) return;
      const response = await AuthService.me();

      if (response && response.user) {
        this.user = response.user;
      } else {
        this.signout();
      }
    },
    async updateMe(updateForm: UpdateUserInput, profileImage = null) {
      const { $toast } = useNuxtApp();
      const { user } = await AuthService.updateMe(updateForm, profileImage);
      this.user = user;
      $toast.success("Saved successfully");
    },
    signout() {
      this.user = null;
      this.token = null;

      const router = useRouter();
      router.push("/");
    },
  },
  persist: true,
});
