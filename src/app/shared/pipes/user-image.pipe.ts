import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../models/user.model';

const images = ['./assets/avatars/avatar0.png', './assets/avatars/avatar1.png', './assets/avatars/avatar2.png',
  './assets/avatars/avatar3.png', './assets/avatars/avatar4.png', './assets/avatars/avatar5.png',
  './assets/avatars/avatar6.png'];

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): string {
    return images[user.id % 6];
  }

}
