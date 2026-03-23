import { useStore } from "~/store";

export default defineNuxtPlugin(async ({ $pinia }) => {
  const { loadCategories } = useStore();
  await loadCategories();
});
