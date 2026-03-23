import { UserService } from '@/services/user.service';
import { Authenticate } from '@/modules/auth';
import { BodyParams, PathParams } from '@tsed/platform-params';
import { Authorized } from '@/middlewares/auth.middleware';
import { Controller, Inject } from '@tsed/di';
import { Get, Put } from '@tsed/schema';
import { UpdateUserInput } from '@/inputs/user.input';

@Controller('/user')
export class UserController {
  @Inject() userService: UserService;

  @Get('/:id')
  get(@PathParams('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Put('/me')
  @Authorized(Authenticate())
  async updateMe(@BodyParams() updates: UpdateUserInput) {
    return await this.userService.update(updates);
  }
}
