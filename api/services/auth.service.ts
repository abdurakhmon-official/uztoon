import prisma from '@/modules/db';
import { comparePassword, createJWT, hashPassword } from '@/modules/auth';
import { BadRequest, Unauthorized } from '@tsed/exceptions';
import { Injectable, InjectContext, PlatformContext } from '@tsed/common';
import { Request } from 'express';
import { SignupInput, SigninInput, SigninInputSchema, SignupInputSchema } from '@/inputs/auth.input';

@Injectable()
export class AuthService {
  @InjectContext()
  private context: PlatformContext;

  get req() {
    return this.context.getRequest<Request>();
  }

  get user() {
    return this.req.user;
  }

  async sinup(input: SignupInput) {
    const data = SignupInputSchema.parse(input);
    try {
      const { username, password } = data;

      let user = await prisma.user.findUnique({
        where: { username },
      });

      if (user) {
        throw new BadRequest('Username already exist');
      }

      user = await prisma.user.create({
        data: Object.assign<any, any>(data, {
          password: await hashPassword(password),
        }),
      });

      return {
        _message: 'Signed up successfuly',
      };
    } catch (err) {
      throw new BadRequest(err.message);
    }
  }

  async signin(input: SigninInput) {
    const data = SigninInputSchema.parse(input);
    const { username, password } = data;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new BadRequest('Username or password incorrect');
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new BadRequest('Username or password incorrect');
    }

    if (!user.active) {
      throw new Unauthorized('You are not allowed to login. Please check your inbox for a welcome email, or contact administrator.');
    } else if (user.deleted) {
      throw new Unauthorized('Your are not allowed to login. Your account has been deleted.');
    }

    const token = createJWT(user);
    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        region: user.region,
        country: user.country,
        role: user.role,
        isAdmin: true,
        isSuperAdmin: true,
        profileImage: user.profileImage,
      },
    };
  }
}
