import prisma from '@/modules/db';
import { SerieColumnsForUI } from '@/modules/dbHelpers';
import { BadRequest } from '@tsed/exceptions';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { Request } from 'express';
import { CreateSerieInput, CreateSerieInputSchema } from '@/inputs/serie.input';

@Injectable()
export class SerieService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async create(webtoonId: string, input: CreateSerieInput) {
    const data = CreateSerieInputSchema.parse(input);
    const webtoon = await prisma.webtoon.findUnique({
      where: { id: webtoonId },
    });

    if (webtoon.creatorId !== this.user.id) {
      throw new BadRequest('Webtoon can be edited by only creator');
    }

    return await prisma.$transaction(async tx => {
      const serie = await tx.serie.create({
        data: {
          title: data.title,
          description: data.description,
          serie: data.serie,
          webtoonId,
          creatorId: this.user.id,
        },
        select: {
          id: true,
          webtoonId: true,
          title: true,
          description: true,
          serie: true,
        },
      });

      await tx.serieImage.createMany({
        data: data.images.map(img => ({
          webtoonId: serie.webtoonId,
          serieId: serie.id,
          image: img.image,
          order: img.order,
        })),
        skipDuplicates: true,
      });

      await tx.serieTag.createMany({
        data: data.tags.map((tag: any) => ({
          webtoonId: serie.webtoonId,
          serieId: serie.id,
          tagId: tag.id,
        })),
        skipDuplicates: true,
      });

      await tx.webtoon.update({
        data: { availableSeries: webtoon.availableSeries++ },
        where: { id: webtoon.id, creatorId: this.user.id },
      });

      return { success: true, _message: 'Saved Successfully', serie };
    });
  }

  async list(webtoonId: string) {
    const series = await prisma.serie.findMany({
      where: { active: true, deleted: false, webtoonId: webtoonId },
      select: SerieColumnsForUI,
      orderBy: {
        serie: 'asc',
      },
    });

    const result = series.map(serie => ({
      ...serie,
      tags: serie.tags.map((tag: any) => tag.tag),
    }));

    return { success: true, series: result };
  }

  async get(serieId: string) {
    const serie = await prisma.serie.findUnique({
      where: { active: true, deleted: false, id: serieId },
      select: SerieColumnsForUI,
    });

    const result = {
      ...serie,
      tags: serie.tags.map((tag: any) => tag.tag),
    };

    return { success: true, serie: result };
  }
}
