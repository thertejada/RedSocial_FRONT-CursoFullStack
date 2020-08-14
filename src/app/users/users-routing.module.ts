import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyThingsComponent} from './components/my-things/my-things.component';
import {MyFriendsComponent} from './components/my-friends/my-friends.component';

const routes: Routes = [
  {path: 'profile', component: MyThingsComponent , data: { state: 'profile' }},
  {path: 'friends', component: MyFriendsComponent,  data: { state: 'friends' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
