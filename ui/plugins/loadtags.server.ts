import { useStore } from "~/store";

export default defineNuxtPlugin(async ({ $pinia }) => {
  const { loadTags } = useStore();
  await loadTags();
});
