import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MyThingsComponent} from './components/my-things/my-things.component';
import {MyFriendsComponent} from './components/my-friends/my-friends.component';
import {InfoComponent} from './components/info/info.component';
import {UsersService} from './services/users.service';
import { InfoFullComponent } from './components/info-full/info-full.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import {RelationsShipService} from './services/relations-ship.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { SelectedUserComponent } from './components/selected-user/selected-user.component';
import {MessagesModule} from '../messages/messages.module';


@NgModule({
  declarations: [MyThingsComponent, MyFriendsComponent, InfoComponent, InfoFullComponent, FriendsListComponent, SearchBarComponent, SearchUsersComponent, SelectedUserComponent],
    imports: [
        SharedModule,
        UsersRoutingModule,
        MessagesModule
    ],
  exports: [
    InfoComponent
  ],
  providers: [
    UsersService, RelationsShipService
  ]
})
export class UsersModule {
}
