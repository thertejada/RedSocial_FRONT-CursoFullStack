import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {URLS_MESSAGE} from '../../shared/constants';
import {Message} from '../../models/message.model';
import {Reaction} from "../../models/reaction.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class MessagesService {
  private _updateLists=new  BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  postMessagesUser(message: Message): Observable<Object>{
    const url = `${environment.URL_BASE}${URLS_MESSAGE.MESSAGES_POST}`;
    return this.http.post(url, message, httpOptions);
  }

  getAllMessagesUser(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}${URLS_MESSAGE.ALL_MESSAGES_USER}/${id}`;
    return this.http.get(url);
  }

  getAllMessagesUserFriend(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}${URLS_MESSAGE.ALL_MESSAGES_USER}/${id}/friendPost`;
    return this.http.get(url);
  }

  deleteMessage(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}${URLS_MESSAGE.MESSAGES_POST}/${id}`;
    return this.http.delete(url);
  }

  getAllMessagesReaction(id: number): Observable<Object> {
    const url = `${environment.URL_BASE}${URLS_MESSAGE.MESSAGES_POST}/${id}/reactions`;
    return this.http.get(url);
  }

  postReactionMessage(id: number, reaction: Reaction): Observable<Object> {
    const url = `${environment.URL_BASE}${URLS_MESSAGE.MESSAGES_POST}/${id}/reactions`;
    return this.http.post(url, reaction, httpOptions);
  }

  updateListsValue(b: boolean) {
    this._updateLists.next(b);
  }

  updateLists$() {
    return this._updateLists.asObservable();
  }

}

