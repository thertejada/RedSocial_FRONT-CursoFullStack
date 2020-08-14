import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {User} from '../../../models/user.model';
import {FriendsListComponent} from '../friends-list/friends-list.component';
import {UsersService} from '../../services/users.service';
import {UserRelationShip} from '../../../models/relation-ship.model';
import {SelectedUserComponent} from '../selected-user/selected-user.component';
import {AuthService} from '../../../shared/services/auth.service';
import {ActionRelationShipEnum} from '../../../models/enums/ActionRelationShipEnum';

@Component({
  selector: 'users-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  @ViewChild(SearchBarComponent, {static: false}) searchBarComponent: SearchBarComponent;
  @ViewChild(FriendsListComponent, {static: false}) friendsListComponent: FriendsListComponent;
  @ViewChild(SelectedUserComponent, {static: false}) selectedUserComponent: SelectedUserComponent;
  notFoundUsersSearched: boolean = false;

  constructor(private service: UsersService, private loginService: AuthService) {
  }

  ngOnInit(): void {
  }

  getSearchValueOfSearchBar($event: any) {
    console.debug('Search bar value: '.concat($event));
    this.searchUsers($event);
  }

  private searchUsers(searchInputValue: string) {
    this.notFoundUsersSearched = false;
    // Si está vacio no buscamos nada, reseteamos la lista
    if (searchInputValue.length != 0) {
      this.service.searchUsers(searchInputValue).subscribe(
        (users: Array<User>) => {
          this.sendListUsersSearched(users.filter(user => {
            return user.id !== this.loginService.getValueUserLogin().id;
          }));
        },
        error => {
          if (error.status == 404) {
            this.notFoundUsersSearched = true;
            console.debug('No hay usuarios que coincidan con la busqueda');
          }
        }
      );
    } else {
      this.sendListUsersSearched(new Array<User>());
    }
  }

  private sendListUsersSearched(users: Array<User>) {
    this.friendsListComponent.eventoActualizarUsersSearched(users);
  }

  /**
   * Método llamado tras hacer una acción en la lista (aceptar relacion, crear o borrar)
   */
  resetSearchInput(reset: boolean) {
    if (reset) {
      this.searchBarComponent.resetInputSearchValue();
      this.resetSelectedUserComponent();
    }
  }

  /**
   * Método llamado tras seleccionar un user de la lista
   */
  eventClickUserRelation(userRelation: UserRelationShip) {
    this.selectedUserComponent.cargarUserRelation(userRelation);
  }

  /**
   *  Método llamado tras hacer una acción en el componente de user seleccionado (aceptar relacion, crear o borrar)
   */
  eventOnActionClick(actionEnum: ActionRelationShipEnum) {
    if (actionEnum == ActionRelationShipEnum.CREATE) {
      this.friendsListComponent.createRelation(this.selectedUserComponent.relationUser);
    } else if (actionEnum == ActionRelationShipEnum.DELETE) {
      this.friendsListComponent.deleteRelation(this.selectedUserComponent.relationUser);
    } else if (actionEnum == ActionRelationShipEnum.ACCEPT) {
      this.friendsListComponent.acceptRelation(this.selectedUserComponent.relationUser);
    }
    this.resetSelectedUserComponent();
  }

  private resetSelectedUserComponent() {
    this.selectedUserComponent.relationUser = undefined;
  }
}
