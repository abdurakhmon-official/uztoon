import { useApi } from "~/composables/useApi";

export class CategoryService {
  static async list() {
    const api = useApi() as any
    const { data } = await api.get("/category");
    return data;
  }
}