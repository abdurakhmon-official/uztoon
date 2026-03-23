import axios from "axios";
import { useAuthStore } from "@/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: `${config.public.baseApiUrl}/api`,
  });

  // Request interceptor — token qo'shish
  api.interceptors.request.use((axiosConfig) => {
    const { token } = useAuthStore();
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  });

  // Response interceptor — toast xabarlari
  api.interceptors.response.use(
    (response) => {
      const data = response.data;
      if (data?._message && import.meta.client) {
        (nuxtApp.$toast as any).success(data._message);
      }
      return response;
    },
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status && status >= 400 && import.meta.client) {
        (nuxtApp.$toast as any).error(message || "Server error!");
      }

      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
