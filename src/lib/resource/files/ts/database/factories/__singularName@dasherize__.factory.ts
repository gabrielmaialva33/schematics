import { faker } from '@faker-js/faker';
import { PartialModelObject } from 'objection';
import { DateTime } from 'luxon';

import { BaseFactory } from '@src/common/module/base.factory';
import { <%= classify(singularName) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singularName) %>.entity';

export class <%= classify(singularName) %>Factory extends BaseFactory<<%= classify(singularName) %>> {
    constructor() {
        super(<%= classify(singularName) %>);
    }

    make(data?: PartialModelObject<<%= classify(singularName) %>>): PartialModelObject<<%= classify(singularName) %>> {
    return {
        name: faker.commerce.productName(),
        created_at: DateTime.fromJSDate(faker.date.past()).toISO() || new Date().toISOString(),
        updated_at: DateTime.fromJSDate(faker.date.recent()).toISO() || new Date().toISOString(),
        ...data,
    };
}

makeStub(data?: PartialModelObject<<%= classify(singularName) %>>): <%= classify(singularName) %> {
    const entity = new <%= classify(singularName) %>();
    const entityData = this.make(data);
    entity.$setDatabaseJson({
        id: faker.number.int(),
        ...entityData,
    });
    return entity;
}
}

export const <%= singularName %>Factory = new <%= classify(singularName) %>Factory();
