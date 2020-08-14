import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Message} from '../../../models/message.model';
import {NgModel} from '@angular/forms';
import {User} from '../../../models/user.model';

@Component({
  selector: 'message-post',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.scss']
})
export class PostMessageComponent implements OnInit {
  newMessage: Message = new Message();
  user: User;

  constructor(private messageService: MessagesService, private loginService: AuthService) {
  }

  ngOnInit(): void {
    this.loginService.userLogin().subscribe(
      value => this.user = value
    );
  }

  addMessage(newMessage: Message) {
    if (this.user !== undefined) {
      newMessage.user = this.user;
      this.messageService.postMessagesUser(this.newMessage).subscribe(
        () => '',
        error => console.error(error),
        () => {
          this.messageService.updateListsValue(true);
          this.newMessage.content = '';
          console.debug('Mensaje enviado: '.concat(newMessage.content));
        }
      );
    }
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
