import {RelationShipStateEnum} from './enums/RelationShipStateEnum';
import {User} from './user.model';

export class UserRelationShip {
  id: number;
  state: RelationShipStateEnum;
  userFriend: User;
}
