import { Pojo, QueryBuilder, ref } from 'objection';
import { omit } from 'helper-fns';

import { BaseEntity } from '@src/common/module/base.entity';
import { DatabaseClient, Env } from '@src/env';
import { StringUtils } from '@src/common/helpers/string.utils';

export class <%= classify(singular(name)) %> extends BaseEntity {
  static tableName = '<%= dasherize(name) %>';

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * Columns are used to define the fields of the model.
   */
  id: number;
  name: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;

  /**
   * ------------------------------------------------------
   * Relations
   * ------------------------------------------------------
   */
  static relationMappings = {};

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Scopes
   * ------------------------------------------------------
   */
  static scopes = {
    notDeleted: (builder: QueryBuilder<<%= classify(singular(name)) %>>) =>
      builder.whereNull('deleted_at'),

    search: (builder: QueryBuilder<<%= classify(singular(name)) %>>, search: string) =>
      builder.where((builder) => {
        const cleanSearch = StringUtils.sanitize(search, true);
        if (!cleanSearch) return;

        const likeOperator =
          Env.DB_CLIENT === DatabaseClient.Postgres ? 'ilike' : 'like';
        const searchTerm = `%${cleanSearch}%`;

        builder.andWhere((b) => {
          for (const field of <%= classify(singular(name)) %>.searchBy) {
            b.orWhere(
              ref(`<%= dasherize(name) %>.${field}`),
              likeOperator,
              searchTerm,
            );
          }
        });
      }),
  };

  /**
   * ------------------------------------------------------
   * JSON Schema & Formatting
   * ------------------------------------------------------
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        deleted_at: { type: ['string', 'null'] },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  $formatJson(json: Pojo) {
    json = super.$formatJson(json);
    return omit(json, ['deleted_at']);
  }

  static searchBy = ['name'];
}
