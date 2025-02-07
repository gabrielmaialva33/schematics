import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrderByDirection } from 'objection';

import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';
import { StringUtils } from '@src/common/helpers/string.utils';
import { <%= classify(singular(name)) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singular(name)) %>.entity';
import { Create<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/create-<%= dasherize(singular(name)) %>.dto';
import { Update<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/update-<%= dasherize(singular(name)) %>.dto';

@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Get()
  paginate(
    @Query('page') page: number = 1,
    @Query('per_page') per_page: number = 10,
    @Query('sort') sort: string = 'id',
    @Query('order') order: OrderByDirection = 'asc',
    @Query('search') search: string = '',
  ) {
    return this.<%= camelize(name) %>Service.paginate({
      page: StringUtils.sanitizeSafeNumber(page),
      per_page: StringUtils.sanitizeSafeNumber(per_page),
      order: StringUtils.sanitizeOrder(order),
      search: StringUtils.sanitizeSafe(search),
      sort: StringUtils.sanitizeSort(
        sort,
        Object.keys(<%= classify(singular(name)) %>.jsonSchema.properties),
        'id',
      ),
    });
  }

  @Get('/all')
  list(
    @Query('sort') sort: string = 'id',
    @Query('order') order: OrderByDirection = 'asc',
    @Query('search') search: string = '',
  ) {
    return this.<%= camelize(name) %>Service.list({
      order: StringUtils.sanitizeOrder(order),
      search: StringUtils.sanitizeSafe(search),
      sort: StringUtils.sanitizeSort(
        sort,
        Object.keys(<%= classify(singular(name)) %>.jsonSchema.properties),
        'id',
      ),
    });
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    return this.<%= camelize(name) %>Service.get(id);
  }

  @Post()
  create(@Body() data: Create<%= classify(singular(name)) %>Dto) {
    return this.<%= camelize(name) %>Service.create(data);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() data: Update<%= classify(singular(name)) %>Dto) {
    return this.<%= camelize(name) %>Service.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.<%= camelize(name) %>Service.remove(id);
  }
}
