import { WebtoonColumnsForUI } from '@/modules/dbHelpers';
import prisma from '@/modules/db';

export class SearchService {
  static async search(search: string) {
    const webtoons = await prisma.webtoon.findMany({
      where: {
        active: true,
        deleted: false,
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive', // Default value: default
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive', // Default value: default
            },
          },
        ],
      },
      take: 10,
      skip: 10,
      select: WebtoonColumnsForUI,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result };
  }
}
