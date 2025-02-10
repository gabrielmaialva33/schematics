import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';

import {
  Paginate<%= classify(name) %>QueryDto,
    List<%= classify(name) %>QueryDto,
} from '@src/modules/<%= dasherize(name) %>/dto/query-<%= dasherize(singular(name)) %>.dto';
import { Create<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/create-<%= dasherize(singular(name)) %>.dto';
import { Update<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/update-<%= dasherize(singular(name)) %>.dto';

@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

@Get()
  paginate(@Query() query?: Paginate<%= classify(name) %>QueryDto) {
    return this.<%= camelize(name) %>Service.paginate(query);
  }

@Get('/all')
  list(@Query() query?: List<%= classify(name) %>QueryDto) {
    return this.<%= camelize(name) %>Service.list(query);
  }

@Get('/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.<%= camelize(name) %>Service.get(id);
  }

@Post()
  create(@Body() data: Create<%= classify(singular(name)) %>Dto) {
    return this.<%= camelize(name) %>Service.create(data);
  }

@Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Update<%= classify(singular(name)) %>Dto) {
    return this.<%= camelize(name) %>Service.update(id, data);
  }

@Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.<%= camelize(name) %>Service.remove(id);
  }
}
