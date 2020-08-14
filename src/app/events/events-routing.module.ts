import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyEventsComponent} from './components/my-events/my-events.component';

const routes: Routes = [
  {path: "events", component: MyEventsComponent,  data: { state: 'events' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
