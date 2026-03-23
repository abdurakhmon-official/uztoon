import { defineStore } from "pinia";
import { CategoryService } from "~/services/category.service";
import { TagService } from "~/services/tag.service";
import type { MainStoreShape } from "~/types";

export const useStore = defineStore("main", {
  state: (): MainStoreShape => ({
    activeMenu: "home",
    categories: [],
    tags: [],
  }),
  getters: {
    getCategoryById: (state: any) => (categoryId: any) =>
      state.categories.find((category: any) => category.id == categoryId),
  },
  actions: {
    setActivePage(name: string) {
      this.activeMenu = name;
    },
    async loadCategories(reload = false) {
      if (!reload && this.categories.length) return;

      const { categories } = await CategoryService.list();
      this.categories = categories;
    },
    async loadTags(reload = false) {
      if (!reload && this.tags.length) return;

      const { tags } = await TagService.list();
      this.tags = tags;
    },
    async createTag(name: string) {
      const tag = await TagService.createTag({ name });
      const found = this.tags.find((t: any) => t.id === tag.id);
      if (found) {
        return found;
      } else {
        this.tags.push(tag);
        return tag;
      }
    },
  },
});
