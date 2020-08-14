import { NgModule } from '@angular/core';

import { MessagesRoutingModule } from './messages-routing.module';
import {SharedModule} from '../shared/shared.module';
import { MyStoriesComponent } from './components/my-stories/my-stories.component';
import { PostMessageComponent } from './components/post-message/post-message.component';
import { ListMessageComponent } from './components/list-message/list-message.component';
import {MessagesService} from "./services/messages.service";
import { FechaMessagePipe } from './pipes/fecha-message.pipe';


@NgModule({
  declarations: [MyStoriesComponent, PostMessageComponent, ListMessageComponent, FechaMessagePipe],
  imports: [
    SharedModule,
    MessagesRoutingModule
  ],
  exports: [
    ListMessageComponent
  ],
  providers: [
    MessagesService
  ]
})
export class MessagesModule { }
