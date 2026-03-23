import { useApi } from "~/composables/useApi";
import type { BasicSearch } from "~/types/input/BasicSearch";
import type { ReviewCreateInput } from "~/types/input/ReviewCreateInput";

export class WebtoonReviewService {
  static async create(id: string, review: ReviewCreateInput) {
    const api = useApi() as any;
    const { data } = await api.post(`/webtoon-review/${id}`, review);
    return data;
  }

  static async get(id: string, search: BasicSearch) {
    const api = useApi() as any;
    const { data } = await api.get(`/webtoon-review/${id}`, { params: search });
    return data;
  }
}