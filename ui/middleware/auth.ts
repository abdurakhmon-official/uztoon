import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useAuthStore();

  if (loggedIn) {
    return;
  } else {
    return abortNavigation(
      showError({
        statusCode: 401,
        message: "Authorization Needed For This Page",
      })
    );
  }
});
