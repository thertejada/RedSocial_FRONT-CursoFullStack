import {Assistance} from './assistance.model';
import {User} from './user.model';
import {EventStateEnum} from './enums/EventStateEnum';

export class Event {
  id: number;
  name: string;
  description: string;
  eventDate: string;
  state: EventStateEnum;
  user: User;
  assistances: Assistance[];

}
