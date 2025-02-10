import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { ZodValidationPipe } from '@src/lib/validation/zod/pipe';

import { <%= classify(name) %>Controller } from '@src/modules/<%= dasherize(name) %>/controllers/<%= dasherize(name) %>.controller';
import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';
import {
  I<%= classify(name) %>Repository,
    <%= underscore(name).toUpperCase() %>_REPOSITORY,
} from '@src/modules/<%= dasherize(name) %>/interfaces/<%= dasherize(singular(name)) %>.interface';


import {
  Paginate<%= classify(name) %>QueryDto,
    List<%= classify(name) %>QueryDto,
} from '@src/modules/<%= dasherize(name) %>/dto/query-<%= dasherize(singular(name)) %>.dto';
import { Create<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/create-<%= dasherize(singular(name)) %>.dto';
import { Update<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/update-<%= dasherize(singular(name)) %>.dto';


import { <%= singular(name) %>Factory } from '@src/database/factories/<%= dasherize(singular(name)) %>.factory';

describe('<%= classify(name) %>Controller', () => {
  let controller: <%= classify(name) %>Controller;
  let service: <%= classify(name) %>Service;

  const completePaginationMeta = {
    total: 5,
    per_page: 5,
    current_page: 2,
    total_pages: 2,
    first: 1,
    previous: 1,
    next: null,
    last: 2,
    has_more: false,
    has_previous: true,
    is_empty: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= classify(name) %>Controller],
      providers: [
        <%= classify(name) %>Service,
        {
          provide: <%= underscore(name).toUpperCase() %>_REPOSITORY,
          useValue: createMock<I<%= classify(name) %>Repository>(),
        },
      ],
    }).compile();

    controller = module.get<<%= classify(name) %>Controller>(<%= classify(name) %>Controller);
    service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('GET /<%= dasherize(name) %> (paginate)', () => {
    it('should return paginated <%= dasherize(name) %> with correct parameters', async () => {
      const mockResult = {
        data: <%= singular(name) %>Factory.makeManyStub(5),
        pagination: { ...completePaginationMeta },
      };
      jest.spyOn(service, 'paginate').mockResolvedValue(mockResult);

      const query: Paginate<%= classify(name) %>QueryDto = {
        page: 2,
        per_page: 5,
        sort: 'name',
        order: 'desc',
        search: 'search',
      };
      const result = await controller.paginate(query);

      expect(service.paginate).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResult);
    });

    it('should use default parameters when none are provided', async () => {
      const defaultPaginationMeta = {
        total: 3,
        per_page: 10,
        current_page: 1,
        total_pages: 1,
        first: null,
        previous: null,
        next: null,
        last: null,
        has_more: false,
        has_previous: false,
        is_empty: false,
      };
      const mockResult = {
        data: <%= singular(name) %>Factory.makeManyStub(3),
        pagination: { ...defaultPaginationMeta },
      };
      jest.spyOn(service, 'paginate').mockResolvedValue(mockResult);

      const pipe = new ZodValidationPipe();
      const transformedQuery = pipe.transform(
          {},
          { type: 'query', metatype: Paginate<%= classify(name) %>QueryDto },
      );
      const result = await controller.paginate(transformedQuery);

      expect(service.paginate).toHaveBeenCalledWith({
        page: 1,
        per_page: 10,
        sort: 'id',
        order: 'asc',
        search: '',
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('GET /<%= dasherize(name) %>/all (list)', () => {
    it('should return all <%= dasherize(name) %> with filters', async () => {
      const entities = <%= singular(name) %>Factory.makeManyStub(3);
      jest.spyOn(service, 'list').mockResolvedValue(entities);

      const result = await controller.list({
        sort: 'name',
        order: 'desc',
        search: 'test',
      });

      expect(service.list).toHaveBeenCalledWith({
        sort: 'name',
        order: 'desc',
        search: 'test',
      });
      expect(result).toEqual(entities);
    });
  });

  describe('GET /<%= dasherize(name) %>/:id', () => {
    it('should return a single <%= singular(name) %>', async () => {
      const entity = <%= singular(name) %>Factory.makeStub();
      jest.spyOn(service, 'get').mockResolvedValue(entity);

      const result = await controller.get(entity.id);
      expect(service.get).toHaveBeenCalledWith(entity.id);
      expect(result).toEqual(entity);
    });

    it('should throw NotFoundException for non-existent <%= singular(name) %>', async () => {
      jest.spyOn(service, 'get').mockRejectedValue(new NotFoundException());
      await expect(controller.get(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /<%= dasherize(name) %>', () => {
    it('should create a new <%= singular(name) %>', async () => {
      const dto: Create<%= classify(singular(name)) %>Dto = { name: 'New <%= classify(singular(name)) %>' } as any;
      const created = <%= singular(name) %>Factory.makeStub(dto);
      jest.spyOn(service, 'create').mockResolvedValue(created);

      const result = await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(created);
    });
  });

  describe('PUT /<%= dasherize(name) %>/:id', () => {
    it('should update a <%= singular(name) %>', async () => {
      const id = 1;
      const dto: Update<%= classify(singular(name)) %>Dto = { name: 'Updated <%= classify(singular(name)) %>' } as any;
      const updated = <%= singular(name) %>Factory.makeStub({ ...dto, id });
      jest.spyOn(service, 'update').mockResolvedValue(updated);

      const result = await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updated);
    });

    it('should throw NotFoundException when updating non-existent <%= singular(name) %>', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      await expect(controller.update(999, { name: 'Updated' } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('DELETE /<%= dasherize(name) %>/:id', () => {
    it('should soft delete a <%= singular(name) %>', async () => {
      const id = 1;
      const deleted = <%= singular(name) %>Factory.makeStub({ id, deleted_at: new Date().toISOString() });
      jest.spyOn(service, 'remove').mockResolvedValue(deleted);

      const result = await controller.delete(id);
      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result.deleted_at).toBeDefined();
    });

    it('should throw NotFoundException when deleting non-existent <%= singular(name) %>', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
