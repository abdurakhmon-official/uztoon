import { TagService } from '@/services/tag.service';
import { Controller, Inject } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { BodyParams, PathParams } from '@tsed/platform-params';
import { TagCreateInput } from '@/inputs/tag.input';

@Controller('/tag')
export class TagController {
  @Inject() tagService: TagService;

  @Get('/')
  async list() {
    return await this.tagService.list();
  }

  @Get('/:id')
  get(@PathParams('id') id: string) {
    return this.tagService.get(id);
  }

  @Post('')
  async post(@BodyParams() data: TagCreateInput) {
    return await this.tagService.create(data);
  }
}
