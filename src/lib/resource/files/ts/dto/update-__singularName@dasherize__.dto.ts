import { z } from '@src/lib/validation/zod/z';
import { CreateZodDto } from '@src/lib/validation/zod/dto';

export const Update<%= classify(singular(name)) %>Schema = z.object({
    name: z.string().min(1).optional(),
});

export class Update<%= classify(singular(name)) %>Dto extends CreateZodDto(Update<%= classify(singular(name)) %>Schema) {}
