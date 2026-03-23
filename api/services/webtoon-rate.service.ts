import prisma from '@/modules/db';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { Request } from 'express';
import { RateCreateInput, RateCreateInputSchema } from '@/inputs/rate.input';

@Injectable()
export class WebtoonRateService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async get(webtoonId: string) {
    const {
      _avg: { vote },
      _count: { id },
    } = await prisma.webtoonVote.aggregate({
      where: { webtoonId },
      _avg: { vote: true },
      _count: { id: true },
    });

    return {
      success: true,
      rate: Math.round((vote ?? 0) * 2) / 2,
      rateCount: id,
    };
  }

  async rate(id: string, input: RateCreateInput) {
    const data = RateCreateInputSchema.parse(input);
    const rate = await prisma.webtoonVote.upsert({
      where: {
        userId_webtoonId: {
          userId: this.user.id,
          webtoonId: id,
        },
      },
      create: {
        userId: this.user.id,
        webtoonId: id,
        vote: data.rate,
      },
      update: {
        vote: data.rate,
      },
    });

    return await this.get(id);
  }
}
