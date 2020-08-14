import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {USER_LOGIN} from './shared/constants';
import {User} from './models/user.model';
import {LEFT_RIGHT_ANIMATION} from './animations/left-right-transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [LEFT_RIGHT_ANIMATION],
})
export class AppComponent implements OnInit {
  title = 'ProyectoFront';
  isLogged: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.login();
  }

  private login() {
    this.authService.login(USER_LOGIN.LOGIN).subscribe(
      (user: User) => this.authService.actualizarUser(user),
      error => {
        if (error.status == 404) {
          console.debug('Usuario de prueba no encontrado. Creando...');
          this.createUser();
        }
      },
      () => {
        this.isLogged = true;
        console.debug('Iniciada sesion con el usuario de pruebas default');
      }
    );
  }

  private createUser() {
    this.authService.createUser(USER_LOGIN.CREATE).subscribe(
      () => '',
      error => console.error(error),
      () => this.login()
    );
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  onClickReintentar() {
    this.login();
  }
}
