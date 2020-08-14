import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserRelationShip} from '../../../models/relation-ship.model';
import {UsersService} from '../../services/users.service';
import {RelationShipStateEnum} from '../../../models/enums/RelationShipStateEnum';
import {User} from '../../../models/user.model';
import {ActionRelationShipEnum} from '../../../models/enums/ActionRelationShipEnum';

@Component({
  selector: 'users-selected-user',
  templateUrl: './selected-user.component.html',
  styleUrls: ['./selected-user.component.scss']
})
export class SelectedUserComponent implements OnInit {

  relationUser: UserRelationShip;
  relationSatus: string = '';
  @Output()
  eventOnActionClick: EventEmitter<ActionRelationShipEnum> = new EventEmitter<ActionRelationShipEnum>();

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  cargarUserRelation(relation: UserRelationShip) {
    this.relationUser = relation;
    this.relationSatus = relation.state.toString();
    if (relation.state == RelationShipStateEnum.FRIEND) {
      this.usersService.getUser(relation.userFriend.id).subscribe(
        (user: User) => this.relationUser.userFriend = user
      );
    } else {
      this.relationUser.userFriend = relation.userFriend;
    }
  }

  deleteRelation() {
    this.eventOnActionClick.emit(ActionRelationShipEnum.DELETE);
  }

  createRelation() {
    this.eventOnActionClick.emit(ActionRelationShipEnum.CREATE);
  }

  acceptRelation() {
    this.eventOnActionClick.emit(ActionRelationShipEnum.ACCEPT);
  }
}
