import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { <%= classify(name) %>Controller } from '@src/modules/<%= dasherize(name) %>/controllers/<%= dasherize(name) %>.controller';
import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';

import {
  I<%= classify(name) %>Repository,
    <%= constantCase(name) %>_REPOSITORY,
} from '@src/modules/<%= dasherize(name) %>/interfaces/<%= dasherize(singular(name)) %>.interface';

describe('<%= classify(name) %>Controller', () => {
  let controller: <%= classify(name) %>Controller;
  let service: <%= classify(name) %>Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= classify(name) %>Controller],
      providers: [
        <%= classify(name) %>Service,
        {
          provide: <%= constantCase(name) %>_REPOSITORY,
          useValue: createMock<I<%= classify(name) %>Repository>(),
        },
      ],
    }).compile();

    controller = module.get<<%= classify(name) %>Controller>(<%= classify(name) %>Controller);
    service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
