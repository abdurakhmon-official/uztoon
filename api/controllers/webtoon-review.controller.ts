import { Authenticate } from '@/modules/auth';
import { WebtoonReviewService } from '@/services/webtoon-review.service';
import { Authorized } from '@/middlewares/auth.middleware';
import { Controller, Inject } from '@tsed/di';
import { BodyParams, PathParams, QueryParams } from '@tsed/platform-params';
import { Post, Get } from '@tsed/schema';
import { ReviewCreateInput } from '@/inputs/review.input';
import { BasicSearch } from '@/inputs/basic.search';

@Controller('/webtoon-review')
export class WebtoonReviewController {
  @Inject() webtoonReviewService: WebtoonReviewService;

  @Post('/:id')
  @Authorized(Authenticate())
  async post(@PathParams('id') id: string, @BodyParams() data: ReviewCreateInput) {
    return await this.webtoonReviewService.create(id, data);
  }

  @Get('/:id')
  async list(@PathParams('id') id: string, @QueryParams() query: BasicSearch) {
    return await this.webtoonReviewService.get(id, query);
  }
}
