import {User} from './user.model';
import {Reaction} from './reaction.model';

export class MessageReactions {
  id: number;
  content: string;
  publishDate: string;
  user: User;
  reactions: Array<Reaction>;
  myReaction: string;
}
