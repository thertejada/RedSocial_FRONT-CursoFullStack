import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../shared/services/auth.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'users-info-full',
  templateUrl: './info-full.component.html',
  styleUrls: ['./info-full.component.scss']
})
export class InfoFullComponent implements OnInit {

  user: User;
  modalDisplay = 'none';
  userToUpdate: User;

  constructor(private loginService: AuthService, private service: UsersService) {
  }

  ngOnInit(): void {
    this.loginService.userLogin().subscribe(
      user => {
        this.user = user;
        this.userToUpdate = Object.create(user);
      },
      error => console.error(error)
    );
  }

  openModal() {
    this.modalDisplay = 'block';
  }

  onCloseHandled() {
    this.modalDisplay = 'none';
    this.userToUpdate = this.user;
  }

  onSubmitEdit() {
    if (this.userToUpdate.surname.length != 0) {
      this.service.updateUser(this.userToUpdate).subscribe(
        () => '',
        error => console.error(error),
        () => {
          console.debug('Usuario actualizado');
          this.user.surname = this.userToUpdate.surname;
          this.loginService.actualizarUser(this.user);
          this.onCloseHandled();
        }
      );
    }
  }
}
