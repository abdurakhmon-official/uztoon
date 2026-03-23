import { Authenticate } from '@/modules/auth';
import { SerieService } from '@/services/serie.service';
import { BodyParams, PathParams } from '@tsed/platform-params';
import { Authorized } from '@/middlewares/auth.middleware';
import { Controller, Inject } from '@tsed/di';
import { Post, Get } from '@tsed/schema';
import { CreateSerieInput } from '@/inputs/serie.input';

@Controller('/serie')
export class SerieController {
  @Inject() serieService: SerieService;

  @Post('/:webtoonId')
  @Authorized(Authenticate())
  async post(@PathParams('webtoonId') webtoonId: string, @BodyParams() data: CreateSerieInput) {
    return await this.serieService.create(webtoonId, data);
  }

  @Get('/:webtoonId')
  async list(@PathParams('webtoonId') webtoonId: string) {
    return await this.serieService.list(webtoonId);
  }

  @Get('/one/:serieId')
  async get(@PathParams('serieId') serieId: string) {
    return await this.serieService.get(serieId);
  }
}
