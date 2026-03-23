import { WebtoonColumnsForUI } from '@/modules/dbHelpers';
import prisma from '@/modules/db';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { Request } from 'express';

@Injectable()
export class WebtoonFollowingService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async get(id: string) {
    const following = await prisma.followingWebtoon.findUnique({
      where: {
        userId_webtoonId: {
          webtoonId: id,
          userId: this.user.id,
        },
      },
    });

    return { success: true, following };
  }

  async list() {
    const followings = await prisma.followingWebtoon.findMany({
      where: {
        userId: this.user.id,
      },
      select: {
        webtoon: {
          select: WebtoonColumnsForUI,
        },
      },
    });

    const result = followings.map(({ webtoon: { _count, ...webtoon } }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      voteCount: _count.votes,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, followings: result };
  }

  async follow(id: string) {
    const following = await prisma.followingWebtoon.create({
      data: {
        webtoonId: id,
        userId: this.user.id,
      },
    });

    return { success: true, following };
  }

  async unfollow(id: string) {
    const unfollow = await prisma.followingWebtoon.delete({
      where: {
        userId_webtoonId: {
          webtoonId: id,
          userId: this.user.id,
        },
      },
    });

    return { success: true };
  }
}
