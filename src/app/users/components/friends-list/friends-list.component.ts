import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RelationsShipService} from '../../services/relations-ship.service';
import {UserRelationShip} from '../../../models/relation-ship.model';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../models/user.model';
import {RelationShipStateEnum} from '../../../models/enums/RelationShipStateEnum';

@Component({
  selector: 'users-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  myRelations: Array<UserRelationShip>;
  private myRelationsFriends: Array<UserRelationShip> = Array<UserRelationShip>();
  private myRelationsPending: Array<UserRelationShip> = Array<UserRelationShip>();
  private myRelationsSearched: Array<UserRelationShip> = Array<UserRelationShip>();
  relationType = new Map<string, string>(); // El html no comprueba el enum del objeto relationship
  @Output()
  resetInputSearchValue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  eventClickUserRelation: EventEmitter<UserRelationShip> = new EventEmitter<UserRelationShip>();

  constructor(private relationService: RelationsShipService,
              private loginService: AuthService) {
  }

  ngOnInit(): void {
    this.loginService.userLogin().subscribe(
      user => {
        if (user.id != undefined) {
          this.getFriendRelations(user);
          this.getPendingRelations(user);
        }
      }
    );
  }

  private getRelations() {
    let user: User = this.loginService.getValueUserLogin();
    this.getFriendRelations(user);
    this.getPendingRelations(user);
  }

  private getPendingRelations(user: User) {
    this.myRelationsPending = Array<UserRelationShip>();
    this.relationService.getRelationsPending(user.id).subscribe(
      (pendings: Array<UserRelationShip>) => {
        this.myRelationsPending = this.myRelationsPending.concat(pendings);
      },
      error => {
        if (error.status == 404) {
          console.debug('No hay relaciones pendientes');
        }
      },
      () => this.crearMyRelations()
    );
  }

  private getFriendRelations(user: User) {
    this.myRelationsFriends = Array<UserRelationShip>();
    this.relationService.getRelationsFriend(user.id).subscribe(
      (friends: Array<UserRelationShip>) => {
        this.myRelationsFriends = this.myRelationsFriends.concat(friends);
      },
      error => {
        if (error.status == 404) {
          console.debug('No hay relaciones de amistad');
        }
      },
      () => this.crearMyRelations()
    );
  }

  private crearMyRelations() {
    // Si hay usuarios en myRelationsSearched mostramos unicamente esa lista
    if (this.myRelationsSearched.length == 0) {
      this.myRelations = this.myRelationsFriends.concat(this.myRelationsPending);
    } else {
      this.myRelations = this.myRelationsSearched;
    }
    // Ordenamos por nombre
    this.myRelations.sort(function(a, b) {
      if (a.userFriend.name < b.userFriend.name) {
        return -1;
      }
      if (a.userFriend.name > b.userFriend.name) {
        return 1;
      }
      return 0;
    });
    // Creamos el mapa ya que el HTML no admite comprobar por enum
    this.relationType = new Map<string, string>();
    this.myRelations.forEach(
      relation => this.relationType.set(relation.userFriend.user, relation.state.toString())
    );
  }

  eventoActualizarUsersSearched(usersSearchedArray: Array<User>) {
    this.myRelationsSearched = new Array<UserRelationShip>();
    if (usersSearchedArray.length > 0) {
      // Crear relationship del user ya que la lista muestra relations
      usersSearchedArray.forEach(userSearched => {
        let rs: UserRelationShip = new UserRelationShip();
        // Comprobar si ya tenemos una relacion con el user
        let rsOfUserFriendPending: UserRelationShip =
          this.myRelationsPending.concat(this.myRelationsFriends).find(r => r.userFriend.user == userSearched.user);
        if (rsOfUserFriendPending != undefined) {
          rs.state = rsOfUserFriendPending.state;
          rs.id = rsOfUserFriendPending.id;
        } else {
          rs.state = RelationShipStateEnum.NO_FRIEND;
        }
        rs.userFriend = userSearched;
        this.myRelationsSearched.push(rs);
      });
    }
    this.crearMyRelations();
  }

  deleteRelation(relation: UserRelationShip) {
    this.relationService.deleteRelation(relation.id).subscribe(
      () => '',
      error => console.error(error),
      () => {
        this.myRelations = this.myRelations.filter(value => {
          return value.id !== relation.id;
        });
        console.debug('Eliminada relacion con: '.concat(relation.userFriend.user));
        // Recargar listas
        this.reset();
      }
    );
  }

  acceptRelation(relation: UserRelationShip) {
    this.relationService.acceptRelation(relation.id).subscribe(
      () => '',
      error => console.error(error),
      () => {
        console.debug('Aceptada peticion de amistad de '.concat(relation.userFriend.user));
        // Recargar listas
        this.reset();
      }
    );
  }

  createRelation(relation: UserRelationShip) {
    this.relationService.createPendingRelation(this.loginService.getValueUserLogin().id, relation.userFriend.id).subscribe(
      () => '',
      error => console.error(error),
      () => {
        console.debug('Enviada petición de amistad a '.concat(relation.userFriend.user));
        // Recargar listas
        this.reset();
      }
    );
  }

  private reset() {
    this.getRelations();
    this.myRelationsSearched = new Array<UserRelationShip>();
    this.resetInputSearchValue.emit(true);
  }

  onClickUserRelation(relation: UserRelationShip) {
    this.eventClickUserRelation.emit(relation);
  }
}
