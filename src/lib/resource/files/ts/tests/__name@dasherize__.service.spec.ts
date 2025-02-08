import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';
import {
  I<%= classify(name) %>Repository,
    <%= constantCase(name) %>_REPOSITORY,
} from '@src/modules/<%= dasherize(name) %>/interfaces/<%= dasherize(singular(name)) %>.interface';

describe('<%= classify(name) %>Service', () => {
  let service: <%= classify(name) %>Service;
  let repository: jest.Mocked<I<%= classify(name) %>Repository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%= classify(name) %>Service,
        {
          provide: <%= constantCase(name) %>_REPOSITORY,
          useValue: createMock<I<%= classify(name) %>Repository>(),
        },
      ],
    }).compile();

    service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service);
    repository = module.get(<%= constantCase(name) %>_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
