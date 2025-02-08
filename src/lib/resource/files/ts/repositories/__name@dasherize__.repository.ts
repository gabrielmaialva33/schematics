import { <%= classify(singular(name)) %> } from '@src/modules/<%= dasherize(name) %>/entities/<%= dasherize(singular(name)) %>.entity';
import { BaseRepository } from '@src/common/module/base-repository';
import { I<%= classify(name) %>Repository } from '@src/modules/<%= dasherize(name) %>/interfaces/<%= dasherize(singular(name)) %>.interface';

export class <%= classify(name) %>Repository extends BaseRepository<<%= classify(singular(name)) %>> implements I<%= classify(name) %>Repository {
  constructor() {
    super(<%= classify(singular(name)) %>);
  }
}
