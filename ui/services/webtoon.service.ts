import { useApi } from "~/composables/useApi";
import type { BasicSearch } from "~/types/input/BasicSearch";

export class WebtoonService {
  static async create(webtoon: any) {
    const api = useApi() as any;
    const uploadResponse = await uploadFile(webtoon.image, "webtoons");
    const { data } = await api.post("/webtoon", { ...webtoon, image: uploadResponse.key });
    return data;
  }

  static async get(id: string) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon/${id}`);
    if (data?.webtoon) {
      return data.webtoon;
    } else {
      throw showError({
        statusCode: 400,
        message: "Webtoon Not Found",
      });
    }
  }

  static async mine() {
    const api = useApi() as any;
    const { data } = await api.get("/webtoon/mine");
    return data;
  }

  static async loadByCategory(id: string, search: BasicSearch) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon/category/${id}`, { params: search });
    return data;
  }

  static async loadByType(type: string, search: BasicSearch) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon/${type}`, { params: search });
    return data;
  }

  static async mightLike(id: string) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon/might-like/${id}`);
    return data;
  }
}