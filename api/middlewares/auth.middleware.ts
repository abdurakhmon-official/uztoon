import { Req } from '@tsed/common';
import { Context } from '@tsed/platform-params';
import { Middleware, MiddlewareMethods, UseAuth } from '@tsed/platform-middlewares';
import { Forbidden, Unauthorized } from '@tsed/exceptions';
import { Request } from 'express';
import { USER_ROLE } from '@prisma/client';
import prisma from '../modules/db';
import jwt from 'jsonwebtoken';
import { UserColumnsForUI } from '../modules/dbHelpers';
import { useDecorators } from '@tsed/core';
import { In, Returns } from '@tsed/schema';

@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
  public async use(@Req() request: Req, @Context() ctx: Context) {
    const options = ctx.endpoint.get(AuthMiddleware) || {};

    await getUser(request);

    if (!request.user) {
      throw new Unauthorized('Unauthorized');
    }

    if (request.user.role === USER_ROLE.ADMIN) {
      return true;
    }

    if (options.role) {
      if (!request.user.role === options.role) {
        throw new Forbidden(`You are not authorized to access this resource.`);
      }
    }
  }
}

async function getUser(req: Request) {
  const clientToken = req.headers['authorization'];
  if (!clientToken) {
    throw new Unauthorized('Unauthorized');
  }

  try {
    const payload: any = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: UserColumnsForUI,
    });

    if (!user) {
      throw new Unauthorized('Unauthorized');
    }

    req.user = user;
  } catch (err) {
    throw new Unauthorized(err.message);
  }
}

export type RoleRequirements = {
  role: USER_ROLE;
};

export function Authenticate(role: USER_ROLE = null): RoleRequirements {
  return { role };
}

export function Authorized(options: RoleRequirements): Function {
  return useDecorators(UseAuth(AuthMiddleware, options), In('header').Name('Authorization').Type(String).Required(true), Returns(401), Returns(403));
}
