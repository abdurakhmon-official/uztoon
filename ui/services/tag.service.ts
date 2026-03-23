import { useApi } from "~/composables/useApi";
import type { TagCreateInput } from "~/types/input/TagCreateInput";

export class TagService {
  static async list() {
    const api = useApi() as any;
    const { data } = await api.get("/tag");
    return data;
  }

  static async createTag(input: TagCreateInput) {
    const api = useApi() as any;
    const { data } = await api.post("/tag", input);
    return data.tag;
  }
}