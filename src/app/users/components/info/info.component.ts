import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'users-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  user: User;

  constructor(private loginService: AuthService) {
  }

  ngOnInit(): void {
    this.loginService.userLogin().subscribe(
      user => this.user = user,
      error => console.error(error)
    );
  }

}
