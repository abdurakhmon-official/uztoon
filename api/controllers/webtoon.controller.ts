import { WebtoonService } from '@/services/webtoon.service';
import { Authenticate } from '@/modules/auth';
import { Authorized } from '@/middlewares/auth.middleware';
import { Controller, Inject } from '@tsed/di';
import { BodyParams, PathParams, QueryParams } from '@tsed/platform-params';
import { Post, Get } from '@tsed/schema';
import { CreateWebToonInput } from '@/inputs/webtoon.input';
import { BasicSearch } from '@/inputs/basic.search';

@Controller('/webtoon')
export class WebtoonController {
  @Inject() webtoonService: WebtoonService;

  @Post('')
  @Authorized(Authenticate())
  async post(@BodyParams() data: CreateWebToonInput) {
    return await this.webtoonService.create(data);
  }

  @Get('/mine')
  @Authorized(Authenticate())
  async mine() {
    return await this.webtoonService.mine();
  }

  @Get('/trending')
  async trending(@QueryParams() query: BasicSearch) {
    return await this.webtoonService.trending(query);
  }

  @Get('/popular')
  async popular(@QueryParams() query: BasicSearch) {
    return await this.webtoonService.popular(query);
  }

  @Get('/recent')
  async recently(@QueryParams() query: BasicSearch) {
    return await this.webtoonService.recent(query);
  }

  @Get('/top-views')
  async topViews(@QueryParams() query: BasicSearch) {
    return await this.webtoonService.topViews(query);
  }

  @Get('/:id')
  async get(@PathParams('id') id: string) {
    return await this.webtoonService.get(id);
  }

  @Get('/category/:id')
  async category(@PathParams('id') id: string, @QueryParams() query: BasicSearch) {
    return await this.webtoonService.category(id, query);
  }

  @Get('/might-like/:id')
  async mightLike(@PathParams('id') id: string, @QueryParams() query: BasicSearch) {
    return await this.webtoonService.mightLike(id, query);
  }
}
