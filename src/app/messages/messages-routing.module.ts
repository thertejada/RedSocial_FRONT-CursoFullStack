import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyStoriesComponent} from './components/my-stories/my-stories.component';

const routes: Routes = [
  {path: 'home', component: MyStoriesComponent,  data: { state: 'home' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {
}
