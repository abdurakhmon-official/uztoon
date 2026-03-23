import { CategoryService } from '@/services/category.service';
import { Controller, Inject } from '@tsed/di';
import { PathParams, BodyParams } from '@tsed/platform-params';
import { Get, Post, Put, Delete } from '@tsed/schema';

@Controller('/category')
export class CategoryController {
  @Inject() categoryService: CategoryService;

  @Get('/')
  async list() {
    return await this.categoryService.list();
  }

  @Get('/:id')
  get(@PathParams('id') id: string) {
    return 'This action returns user #' + id;
  }

  @Post('')
  post(@BodyParams() category: any) {
    return 'Saving user...';
  }

  @Put('/:id')
  put(@PathParams('id') id: string) {
    return 'Updating a user...';
  }

  @Delete('/:id')
  remove(@PathParams('id') id: string) {
    return 'Removing user...';
  }
}
