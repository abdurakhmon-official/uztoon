import { UpdateUserInput, UpdateUserInputSchema } from '@/inputs/user.input';
import prisma from '@/modules/db';
import { PlatformContext } from '@tsed/common';
import { Injectable, InjectContext } from '@tsed/di';
import { BadRequest } from '@tsed/exceptions';
import { Request } from 'express';

@Injectable()
export class UserService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async update(input: UpdateUserInput) {
    const updates = UpdateUserInputSchema.parse(input);
    const dbUser = await prisma.user.findUnique({
      where: { id: this.user.id },
    });

    if (!dbUser) {
      throw new BadRequest('User Not Found');
    }

    const updated = await prisma.user.update({
      data: { ...updates },
      where: { id: this.user.id },
    });

    return {
      success: true,
      user: {
        id: updated.id,
        username: updated.username,
        firstName: updated.firstName,
        lastName: updated.lastName,
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone,
        region: updated.region,
        country: updated.country,
        role: updated.role,
        profileImage: updated.profileImage,
      },
    };
  }
}
