import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';

import {
  I<%= classify(name) %>Repository,
    <%= underscore(name).toUpperCase() %>_REPOSITORY,
    <%= classify(name) %>List,
    <%= classify(name) %>Paginate,
} from '@src/modules/<%= dasherize(name) %>/interfaces/<%= dasherize(singular(name)) %>.interface';
import { <%= classify(singular(name)) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singular(name)) %>.entity';
import { StringUtils } from '@src/common/helpers/string.utils';
import { createPagination } from '@src/common/module/pagination/create-pagination';
import { Create<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/create-<%= dasherize(singular(name)) %>.dto';
import { Update<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/update-<%= dasherize(singular(name)) %>.dto';

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @Inject(<%= underscore(name).toUpperCase() %>_REPOSITORY)
    private readonly <%= camelize(name) %>Repository: I<%= classify(name) %>Repository,
  ) {}

  async paginate(params?: <%= classify(name) %>Paginate) {
    const { search, ...options } = params || {};

    const { total, results } = await this.<%= camelize(name) %>Repository.paginate(
      options,
      (qb) => {
        void qb.modify(<%= classify(singular(name)) %>.scopes.notDeleted);
        if (StringUtils.sanitizeSafe(search)) {
          void qb.modify(<%= classify(singular(name)) %>.scopes.search, search);
        }
      },
    );

    return createPagination<<%= classify(singular(name)) %>>({
      total,
      data: results,
      page: options.page,
      per_page: options.per_page,
    });
  }

  async list(params?: <%= classify(name) %>List) {
    const { search, ...options } = params || {};

    return this.<%= camelize(name) %>Repository.list(options, (qb) => {
      void qb.modify(<%= classify(singular(name)) %>.scopes.notDeleted);
      if (StringUtils.sanitizeSafe(search)) {
        void qb.modify(<%= classify(singular(name)) %>.scopes.search, search);
      }
    });
  }

  async get(id: number) {
    const entity = await this.<%= camelize(name) %>Repository.find(id, (qb) => {
      void qb.modify(<%= classify(singular(name)) %>.scopes.notDeleted);
    });

    if (!entity) {
      throw new NotFoundException({ message: '<%= classify(singular(name)) %> not found' });
    }

    return entity;
  }

  async create(data: Create<%= classify(singular(name)) %>Dto) {
    return this.<%= camelize(name) %>Repository.create(data);
  }

  async update(id: number, data: Update<%= classify(singular(name)) %>Dto) {
    const entity = await this.get(id);
    entity.$set(data);
    return this.<%= camelize(name) %>Repository.update(entity);
  }

  async remove(id: number) {
    const entity = await this.get(id);
    entity.$set({ deleted_at: DateTime.local().toSQL() });
    return this.<%= camelize(name) %>Repository.update(entity);
  }
}
