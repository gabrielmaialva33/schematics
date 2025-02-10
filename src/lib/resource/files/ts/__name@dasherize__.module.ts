import { Module } from '@nestjs/common';

import { <%= classify(name) %>Controller } from '@src/modules/<%= dasherize(name) %>/controllers/<%= dasherize(name) %>.controller';
import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';
import { <%= classify(name) %>Repository } from '@src/modules/<%= dasherize(name) %>/repositories/<%= dasherize(name) %>.repository';
import { <%= underscore(name).toUpperCase() %>_REPOSITORY } from '@src/modules/<%= dasherize(name) %>/interfaces/<%= singular(name) %>.interface';

@Module({
  controllers: [<%= classify(name) %>Controller],
  providers: [
    <%= classify(name) %>Service,
    {
      provide: <%= underscore(name).toUpperCase() %>_REPOSITORY,
      useClass: <%= classify(name) %>Repository,
    },
  ],
  exports: [<%= classify(name) %>Service, <%= underscore(name).toUpperCase() %>_REPOSITORY],
})
export class <%= classify(name) %>Module {}