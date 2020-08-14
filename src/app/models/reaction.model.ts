import {ReactionTypeEnum} from './enums/ReactionTypeEnum';
import {User} from './user.model';

export class Reaction {
  id: number;
  type: ReactionTypeEnum;
  user: User;
}
