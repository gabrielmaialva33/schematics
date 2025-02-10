import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { createMock } from '@golevelup/ts-jest';

import { <%= classify(name) %>Service } from '@src/modules/<%= dasherize(name) %>/services/<%= dasherize(name) %>.service';
import {
    I<%= classify(name) %>Repository,
    <%= underscore(name).toUpperCase() %>_REPOSITORY,
} from '@src/modules/<%= dasherize(name) %>/interfaces/<%= dasherize(singular(name)) %>.interface';

import { <%= classify(singular(name)) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singular(name)) %>.entity';

import { Create<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/create-<%= dasherize(singular(name)) %>.dto';
import { Update<%= classify(singular(name)) %>Dto } from '@src/modules/<%= dasherize(name) %>/dto/update-<%= dasherize(singular(name)) %>.dto';

import { <%= singular(name) %>Factory } from '@src/database/factories/<%= dasherize(singular(name)) %>.factory';
import { ZodValidationPipe } from '@src/lib/validation/zod/pipe';
import { Paginate<%= classify(name) %>QueryDto } from '@src/modules/<%= dasherize(name) %>/dto/query-<%= dasherize(singular(name)) %>.dto';
import { List<%= classify(name) %>QueryDto } from '@src/modules/<%= dasherize(name) %>/dto/query-<%= dasherize(singular(name)) %>.dto';
import { PaginateResult } from '@src/common/module/base-repository-interface';

describe('<%= classify(name) %>Service', () => {
    let service: <%= classify(name) %>Service;
    let repository: jest.Mocked<I<%= classify(name) %>Repository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                <%= classify(name) %>Service,
                {
                    provide: <%= underscore(name).toUpperCase() %>_REPOSITORY,
                    useValue: createMock<I<%= classify(name) %>Repository>(),
                },
            ],
        }).compile();

        service = module.get<<%= classify(name) %>Service>(<%= classify(name) %>Service);
        repository = module.get(<%= underscore(name).toUpperCase() %>_REPOSITORY);
    });

    describe('paginate()', () => {
        it('should return paginated data', async () => {
            const entities: <%= classify(singular(name)) %>[] = <%= singular(name) %>Factory.makeManyStub(5);
            const paginationResult: PaginateResult<<%= classify(singular(name)) %>> = {
                results: entities,
                total: entities.length,
            };
            repository.paginate.mockResolvedValue(paginationResult);

            const pipe = new ZodValidationPipe();
            const transformedQuery = pipe.transform(
                {
                    page: 1,
                    per_page: 10,
                    sort: 'id',
                    order: 'asc',
                    search: '',
                },
                {
                    type: 'query',
                    metatype: Paginate<%= classify(name) %>QueryDto,
                },
            );

            const result = await service.paginate(transformedQuery);

            expect(repository.paginate).toHaveBeenCalledWith(
                expect.objectContaining({
                    page: 1,
                    per_page: 10,
                    sort: 'id',
                    order: 'asc',
                }),
                expect.any(Function),
            );
            expect(result.data).toEqual(entities);
        });
    });

    describe('list()', () => {
        it('should return list of entities', async () => {
            const entities: <%= classify(singular(name)) %>[] = <%= singular(name) %>Factory.makeManyStub(3);
            repository.list.mockResolvedValue(entities);

            const pipe = new ZodValidationPipe();
            const transformedQuery = pipe.transform(
                {
                    sort: 'id',
                    order: 'asc',
                    search: '',
                },
                {
                    type: 'query',
                    metatype: List<%= classify(name) %>QueryDto,
                },
            );

            const result = await service.list(transformedQuery);

            expect(repository.list).toHaveBeenCalledWith(
                {
                    sort: 'id',
                    order: 'asc',
                },
                expect.any(Function),
            );
            expect(result).toEqual(entities);
        });
    });

    describe('get()', () => {
        it('should return a single entity', async () => {
            const entity = <%= singular(name) %>Factory.makeStub();
            repository.find.mockResolvedValue(entity);

            const result = await service.get(entity.id);
            expect(repository.find).toHaveBeenCalledWith(
                entity.id,
                expect.any(Function),
            );
            expect(result).toEqual(entity);
        });

        it('should throw NotFoundException if entity not found', async () => {
            repository.find.mockResolvedValue(undefined as unknown as <%= classify(singular(name)) %>);
            await expect(service.get(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('create()', () => {
        it('should create an entity', async () => {
            const dto: Create<%= classify(singular(name)) %>Dto = { name: 'New <%= classify(singular(name)) %>' } as any;
            const created = <%= singular(name) %>Factory.makeStub(dto);
            repository.create.mockResolvedValue(created);

            const result = await service.create(dto);
            expect(repository.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(created);
        });
    });

    describe('update()', () => {
        it('should update an entity', async () => {
            const dto: Update<%= classify(singular(name)) %>Dto = { name: 'Updated <%= classify(singular(name)) %>' } as any;
            const entity = { id: 1, name: 'Old <%= classify(singular(name)) %>', $set: jest.fn() } as any;
            repository.find.mockResolvedValue(entity);
            repository.update.mockResolvedValue({
                id: 1,
                name: 'Updated <%= classify(singular(name)) %>',
            } as any);

            const result = await service.update(1, dto);
            expect(repository.find).toHaveBeenCalledWith(1, expect.any(Function));
            expect(entity.$set).toHaveBeenCalledWith(dto);
            expect(repository.update).toHaveBeenCalledWith(entity);
            expect(result.name).toEqual('Updated <%= classify(singular(name)) %>');
        });
    });

    describe('remove()', () => {
        it('should soft delete an entity', async () => {
            const entity = { id: 1, name: 'Test', $set: jest.fn() } as any;
            repository.find.mockResolvedValue(entity);
            const deleted = <%= singular(name) %>Factory.makeStub({
                id: 1,
                deleted_at: DateTime.local().toSQL(),
            });
            repository.update.mockResolvedValue(deleted);

            const result = await service.remove(1);
            expect(repository.find).toHaveBeenCalledWith(1, expect.any(Function));
            expect(entity.$set).toHaveBeenCalledWith({
                deleted_at: expect.any(String),
            });
            expect(repository.update).toHaveBeenCalledWith(entity);
            expect(result.deleted_at).toBeDefined();
        });
    });
});