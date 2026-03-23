import prisma from '@/modules/db';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { Request } from 'express';

@Injectable()
export class CategoryService {
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
    const categories = await prisma.category.findMany({
      where,
      select: {
        id: true,
        name: true,
      },
    });
    return {
      success: true,
      categories,
    };
  }
}
