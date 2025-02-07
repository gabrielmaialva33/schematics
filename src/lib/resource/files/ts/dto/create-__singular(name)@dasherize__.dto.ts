import { z } from '@src/lib/validation/zod/z';
import { CreateZodDto } from '@src/lib/validation/zod/dto';

export const Create<%= classify(singular(name)) %>Schema = z.object({});

export class Create<%= classify(singular(name)) %>Dto extends CreateZodDto(Create<%= classify(singular(name)) %>Schema) {}
