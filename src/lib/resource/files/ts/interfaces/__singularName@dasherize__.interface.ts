import {
  IBaseRepository,
  ListOptions,
} from '@src/common/module/base-repository-interface';
import { <%= classify(singular(name)) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singular(name)) %>.entity';
import { PaginationOptions } from '@src/common/module/pagination/pagination.interface';

export const <%= underscore(name).toUpperCase() %>_REPOSITORY = Symbol('<%= underscore(name).toUpperCase() %>_REPOSITORY');

export type I<%= classify(name) %>Repository = IBaseRepository<<%= classify(singular(name)) %>>;

interface ScopesParams {
  search?: string;
}

export interface <%= classify(name) %>List extends ListOptions<<%= classify(singular(name)) %>>, ScopesParams {}
export interface <%= classify(name) %>Paginate extends PaginationOptions<<%= classify(singular(name)) %>>, ScopesParams {}
