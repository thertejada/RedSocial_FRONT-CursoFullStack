import {NgModule} from '@angular/core';

import {EventsRoutingModule} from './events-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MyEventsComponent} from './components/my-events/my-events.component';
import {EventSelectionComponent} from './components/event-selection/event-selection.component';
import {EventListComponent} from './components/event-list/event-list.component';
import {EventInfoComponent} from './components/event-info/event-info.component';
import {EventsService} from './service/events.service';
import { EventCreateComponent } from './components/event-create/event-create.component';
import {UsersModule} from '../users/users.module';
import { EventStatePipe } from './pipes/event-state.pipe';
import {EventCreateService} from './service/event-create.service';
import { CountSizeTextareaPipe } from './pipes/count-lines.pipe';


@NgModule({
  declarations: [MyEventsComponent, EventSelectionComponent, EventListComponent, EventInfoComponent, EventCreateComponent, EventStatePipe, CountSizeTextareaPipe],
  imports: [
    SharedModule,
    EventsRoutingModule,
    UsersModule
  ],
  providers: [EventsService, EventCreateService]
})
export class EventsModule {
}
