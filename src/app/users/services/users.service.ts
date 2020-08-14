import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {URLS_USER} from '../../shared/constants';
import {User} from '../../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UsersService {

  constructor(private  http: HttpClient) {
  }

  getUser(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${id}`;
    return this.http.get(url, httpOptions);
  }

  updateUser(user: User): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${user.id}/${'?surname=' + user.surname}`;
    return this.http.put<User>(url, httpOptions);
  }

  searchUsers(search: string): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.SEARCH}${search}`;
    return this.http.get(url, httpOptions);
  }

}
