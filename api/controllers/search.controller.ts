import { SearchService } from '@/services/search.service';
import { Controller } from '@tsed/di';
import { Get } from '@tsed/schema';
import { QueryParams } from '@tsed/platform-params';

@Controller('/search')
export class SearchController {
  @Get('/')
  async search(@QueryParams('search') search: string) {
    return await SearchService.search(search);
  }
}
