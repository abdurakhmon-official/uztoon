import { Authorized } from '@/middlewares/auth.middleware';
import { Authenticate } from '@/modules/auth';
import { WebtoonFollowingService } from '@/services/webtoon-following.service';
import { Controller, Inject } from '@tsed/di';
import { PathParams } from '@tsed/platform-params';
import { Get, Post, Delete } from '@tsed/schema';

@Controller('/webtoon-following')
export class WebtoonFollowingController {
  @Inject() webtoonFollowingService: WebtoonFollowingService;

  @Get('/:id')
  @Authorized(Authenticate())
  async get(@PathParams('id') id: string) {
    return await this.webtoonFollowingService.get(id);
  }

  @Get('/')
  @Authorized(Authenticate())
  async list() {
    return await this.webtoonFollowingService.list();
  }

  @Post('/:id')
  @Authorized(Authenticate())
  async follow(@PathParams('id') id: string) {
    return await this.webtoonFollowingService.follow(id);
  }

  @Delete('/:id')
  @Authorized(Authenticate())
  async unfollow(@PathParams('id') id: string) {
    return await this.webtoonFollowingService.unfollow(id);
  }
}
