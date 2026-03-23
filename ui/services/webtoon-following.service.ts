import { useApi } from "~/composables/useApi";

export class WebtoonFollowingService {
  static async get(id: string) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon-following/${id}`);
    return data;
  }

  static async list() {
    const api = useApi() as any;
    const { data } = await api.get("/webtoon-following");
    return data;
  }

  static async follow(id: string) {
    const api = useApi() as any;
    const { data } = await api.post(`/webtoon-following/${id}`);
    return data;
  }

  static async unfollow(id: string) {
    const api = useApi() as any;
    const { data } = await api.delete(`/webtoon-following/${id}`);
    return data;
  }
}