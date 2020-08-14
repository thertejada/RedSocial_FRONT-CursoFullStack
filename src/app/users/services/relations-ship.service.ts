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
export class RelationsShipService {

  constructor(private  http: HttpClient) {
  }

  getRelationsFriend(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${id}/${URLS_USER.FRIEND_RS}`;
    return this.http.get(url, httpOptions);
  }

  getRelationsPending(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${id}/${URLS_USER.PENDING_RS}`;
    return this.http.get(url, httpOptions);
  }

  deleteRelation(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${URLS_USER.BASE_RS}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  acceptRelation(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${URLS_USER.BASE_RS}/${id}`;
    return this.http.put<User>(url, httpOptions);
  }

  createPendingRelation(myId: number, friendId: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_USER.BASE}/${myId}/${URLS_USER.INVITE_FRIEND}${friendId}`;
    return this.http.post(url, httpOptions);
  }
}
