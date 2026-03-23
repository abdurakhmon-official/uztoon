import { Authenticate } from '@/modules/auth';
import { WebtoonRateService } from '@/services/webtoon-rate.service';
import { Controller, Inject } from '@tsed/di';
import { Authorized } from '@/middlewares/auth.middleware';
import { Get, Post } from '@tsed/schema';
import { BodyParams, PathParams } from '@tsed/platform-params';
import { RateCreateInput } from '@/inputs/rate.input';

@Controller('/webtoon-rate')
export class WebtoonRateController {
  @Inject() webtoonRateService: WebtoonRateService;

  @Get('/:id')
  async get(@PathParams('id') id: string) {
    return await this.webtoonRateService.get(id);
  }

  @Post('/:id')
  @Authorized(Authenticate())
  async follow(@PathParams('id') id: string, @BodyParams() data: RateCreateInput) {
    return await this.webtoonRateService.rate(id, data);
  }
}
