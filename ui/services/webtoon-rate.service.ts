import { useApi } from "~/composables/useApi";

export class WebtoonRateService {
  static async get(id: string) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon-rate/${id}`);
    return data;
  }

  static async rate(id: string, rate: number) {
    const api = useApi() as any;
    const { data } = await api.post(`/webtoon-rate/${id}`, { rate });
    return data;
  }
}