import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {URLS_USER} from '../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {

  private _userLogin = new BehaviorSubject<User>(new User());

  constructor(private  http: HttpClient) {
  }

  login(user: any): Observable<Object> {
    return this.http.post<any>(environment.URL_BASE + URLS_USER.LOGIN, user, httpOptions);
  }

  createUser(user: any): Observable<Object> {
    return this.http.post<any>(environment.URL_BASE + URLS_USER.BASE, user, httpOptions);
  }

  actualizarUser(user: User): void {
    this._userLogin.next(user);
  }

  userLogin() {
    return this._userLogin.asObservable();
  }

  getValueUserLogin(): User {
    return this._userLogin.getValue();
  }
}
