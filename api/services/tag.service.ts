import { TagCreateInput, TagCreateInputSchema } from '@/inputs/tag.input';
import prisma from '@/modules/db';
import { PlatformContext } from '@tsed/common';
import { InjectContext } from '@tsed/di';
import { BadRequest } from '@tsed/exceptions';
import { Request } from 'express';

export class TagService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async list() {
    const where = this.user?.isAdmin ? {} : { active: true };
    const tags = await prisma.tag.findMany({
      where,
      select: {
        id: true,
        name: true,
      },
    });
    return {
      success: true,
      tags,
    };
  }

  async get(id: string) {
    const tag = await prisma.tag.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
    return {
      success: true,
      tag,
    };
  }

  async create(input: TagCreateInput) {
    const data = TagCreateInputSchema.parse(input);
    try {
      let tag = await prisma.tag.findUnique({
        where: { name: data.name },
        select: {
          id: true,
          name: true,
        },
      });
      if (tag) {
        return {
          success: true,
          tag,
        };
      }

      tag = await prisma.tag.create({
        data: Object.assign<any, any>({}, data),
      });
      return {
        success: true,
        tag: {
          id: tag.id,
          name: tag.name,
        },
      };
    } catch (err) {
      throw new BadRequest(err.message);
    }
  }
}
