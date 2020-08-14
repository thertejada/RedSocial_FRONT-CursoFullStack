import {User} from './user.model';

export class Message {
  id: number;
  content: string;
  publishDate: string;
  user: User;
}
