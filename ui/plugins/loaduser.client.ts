import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async ({ $pinia }) => {
  const { loggedIn, me } = useAuthStore($pinia as any);
  if (loggedIn) {
    await me(true);
  }
});
