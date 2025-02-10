import { z } from '@src/lib/validation/zod/z';
import { CreateZodDto } from '@src/lib/validation/zod/dto';
import { <%= classify(singular(name)) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singular(name)) %>.entity';
import { StringUtils } from '@src/common/helpers/string.utils';

export const Paginate<%= classify(name) %>QuerySchema = z.object({
    page: z.coerce
        .number()
        .min(1)
        .default(1)
        .transform((val) => StringUtils.sanitizeSafeNumber(val)),
    per_page: z.coerce
        .number()
        .min(1)
        .max(100)
        .default(10)
        .transform((val) => StringUtils.sanitizeSafeNumber(val)),
    sort: z
        .enum(<%= classify(singular(name)) %>.sortKeys)
        .default('id')
        .transform((val) => StringUtils.sanitizeSort(val, <%= classify(singular(name)) %>.sortKeys, 'id')),
    order: z
        .enum(['asc', 'desc'])
        .default('asc')
        .transform((val) => StringUtils.sanitizeOrder(val)),
    search: z
        .string()
        .optional()
        .transform((val) => (val ? StringUtils.sanitizeSafe(val) : '')),
});

export class Paginate<%= classify(name) %>QueryDto extends CreateZodDto(Paginate<%= classify(name) %>QuerySchema) {}

export const List<%= classify(name) %>QuerySchema = z.object({
    sort: z
        .enum(<%= classify(singular(name)) %>.sortKeys)
        .default('id')
        .transform((val) => StringUtils.sanitizeSort(val, <%= classify(singular(name)) %>.sortKeys, 'id')),
    order: z
        .enum(['asc', 'desc'])
        .default('asc')
        .transform((val) => StringUtils.sanitizeOrder(val)),
    search: z
        .string()
        .optional()
        .transform((val) => (val ? StringUtils.sanitizeSafe(val) : '')),
});

export class List<%= classify(name) %>QueryDto extends CreateZodDto(List<%= classify(name) %>QuerySchema) {}
