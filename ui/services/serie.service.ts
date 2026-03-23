import { useApi } from "~/composables/useApi";

export class SerieService {
  static async create(webtoonId: string, serie: any) {
    const api = useApi() as any;

    for (const img of serie.images) {
      const uploadResponse = await uploadFile(img.image, "series");
      img.image = uploadResponse.key;
    }

    const { data } = await api.post(`/serie/${webtoonId}`, serie);
    return data;
  }

  static async list(webtoonId: string) {
    const api = useApi() as any;
    const { data } = await api.get(`/serie/${webtoonId}`);
    return data;
  }

  static async get(serieId: string) {
    const api = useApi() as any;
    const { data } = await api.get(`/serie/one/${serieId}`);
    return data;
  }
}