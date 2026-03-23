import prisma from '@/modules/db';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { Request } from 'express';
import { ReviewCreateInput, ReviewCreateInputSchema } from '@/inputs/review.input';
import { BasicSearch, BasicSearchSchema } from '@/inputs/basic.search';

@Injectable()
export class WebtoonReviewService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async get(id: string, query: BasicSearch) {
    const search = BasicSearchSchema.parse(query);
    const where = { webtoonId: id };

    const [reviews, count] = await prisma.$transaction(async tx => [
      await tx.webtoonReview.findMany({
        where,
        take: search.size,
        skip: search.skip,
        select: {
          id: true,
          review: true,
          createdAt: true,
          author: {
            select: {
              fullName: true,
              profileImage: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      await tx.webtoonReview.count({ where }),
    ]);

    return { success: true, reviews: reviews.reverse(), count };
  }

  async create(id: string, input: ReviewCreateInput) {
    const data = ReviewCreateInputSchema.parse(input);
    const review = await prisma.webtoonReview.create({
      data: Object.assign<any, any>(data, {
        webtoonId: id,
        authorId: this.user.id,
      }),
    });

    return { success: true, _message: 'Review created successfully' };
  }
}
