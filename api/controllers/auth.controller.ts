import { AuthService } from '@/services/auth.service';
import { Authenticate } from '@/modules/auth';
import { Authorized } from '../middlewares/auth.middleware';
import { Request } from 'express';
import { Req } from '@tsed/common';
import { Controller, Inject } from '@tsed/di';
import { BodyParams } from '@tsed/platform-params';
import { Post, Get } from '@tsed/schema';
import { SigninInput, SignupInput } from '@/inputs/auth.input';

@Controller('/auth')
export class AuthController {
  @Inject() authService: AuthService;

  @Post('/signup')
  async singup(@BodyParams() data: SignupInput) {
    return await this.authService.sinup(data);
  }

  @Post('/signin')
  async signin(@BodyParams() data: SigninInput) {
    return await this.authService.signin(data);
  }

  @Get('/me')
  @Authorized(Authenticate())
  async me(@Req() req: Request) {
    return { success: true, user: req.user };
  }
}
