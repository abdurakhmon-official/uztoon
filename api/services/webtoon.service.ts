import { WebtoonColumnsForUI } from '@/modules/dbHelpers';
import prisma from '@/modules/db';
import moment from 'moment';
import { BadRequest } from '@tsed/exceptions';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { Request } from 'express';
import { BasicSearch, BasicSearchSchema } from '@/inputs/basic.search';
import { CreateWebToonInput, CreateWebToonInputSchema } from '@/inputs/webtoon.input';

@Injectable()
export class WebtoonService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async mine() {
    const webtoons = await prisma.webtoon.findMany({
      where: { active: true, deleted: false, creatorId: this.user.id },
      select: WebtoonColumnsForUI,
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    });

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result };
  }

  async category(categoryId: string, query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const where = { active: true, deleted: false, categoryId };

    const [webtoons, count] = await prisma.$transaction(async tx => [
      await tx.webtoon.findMany({
        where,
        take: search.size,
        skip: search.skip,
        select: WebtoonColumnsForUI,
        orderBy: [search.sorting, { id: 'asc' }],
      }),
      await tx.webtoon.count({ where }),
    ]);

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result, count };
  }

  async get(id: string) {
    const { _count, ...webtoon } = await prisma.webtoon.findUnique({
      where: { id },
      select: WebtoonColumnsForUI,
    });

    if (!webtoon) {
      throw new BadRequest('Webtoon Not Found');
    }

    const result = {
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      voteCount: _count.votes,
      followingWebtoons: _count.followingWebtoons,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    };
    return { success: true, webtoon: result };
  }

  async create(input: CreateWebToonInput) {
    const data = CreateWebToonInputSchema.parse(input);
    const webtoon: any = await prisma.webtoon.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        totalSeries: data.totalSeries,
        categoryId: data.category.id,
        creatorId: this.user.id,
        tags: {
          create: data.tags.map((tag: any) => ({
            tagId: tag.id,
          })),
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        series: true,
        availableSeries: true,
      },
    });

    return { success: true, _message: 'Saved Successfully', webtoon };
  }

  async update(userId: string, id: string, updates: any) {
    const webtoon = await prisma.webtoon.update({
      data: updates,
      where: { id, creatorId: userId },
    });
    return { success: true, webtoon };
  }

  async delete(id: string) {
    const webtoon = await prisma.webtoon.update({
      data: { deleted: true },
      where: { id, creatorId: this.user.id },
    });
    return { success: true, webtoon };
  }

  async trending(query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const where = { active: true, deleted: false };

    const [webtoons, count] = await prisma.$transaction(async tx => [
      await tx.webtoon.findMany({
        where,
        take: search.size,
        skip: search.skip,
        select: WebtoonColumnsForUI,
        orderBy: [search.sorting, { id: 'asc' }],
      }),
      await tx.webtoon.count({ where }),
    ]);

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result, count };
  }

  async popular(query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const where = { active: true, deleted: false };

    const [webtoons, count] = await prisma.$transaction(async tx => [
      await tx.webtoon.findMany({
        where,
        take: search.size,
        skip: search.skip,
        select: WebtoonColumnsForUI,
        orderBy: [search.sorting, { id: 'asc' }],
      }),
      await tx.webtoon.count({ where }),
    ]);

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result, count };
  }

  async recent(query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const where = {
      active: true,
      deleted: false,
      createdAt: {
        gte: moment().subtract(1, 'w').toDate(),
      },
    };

    const [webtoons, count] = await prisma.$transaction(async tx => [
      await tx.webtoon.findMany({
        where,
        take: search.size,
        skip: search.skip,
        select: WebtoonColumnsForUI,
        orderBy: [search.sorting, { id: 'asc' }],
      }),
      await tx.webtoon.count({ where }),
    ]);

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result, count };
  }

  async topViews(query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const webtoons = await prisma.webtoon.findMany({
      where: {
        active: true,
        deleted: false,
      },
      take: search.size,
      select: WebtoonColumnsForUI,
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    });

    const periods = ['mix', 'day', 'week', 'month', 'year'];
    const shuffleArray = (array: any[]) => array.sort(() => 0.5 - Math.random());

    const result = webtoons.map(({ _count, ...webtoon }) => ({
      ...webtoon,
      reviewCount: _count.webtoonReviews,
      purchaseCount: 0,
      periods: shuffleArray(periods).slice(0, 3),
      tags: webtoon.tags.map(tag => tag.tag),
    }));

    return { success: true, webtoons: result };
  }

  async mightLike(id: string, query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const webtoon = await prisma.webtoon.findUnique({
      where: { active: true, deleted: false, id },
    });

    const webtoons = await prisma.webtoon.findMany({
      where: {
        active: true,
        deleted: false,
        categoryId: {
          not: webtoon.categoryId,
        },
      },
      take: search.size,
      select: WebtoonColumnsForUI,
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
