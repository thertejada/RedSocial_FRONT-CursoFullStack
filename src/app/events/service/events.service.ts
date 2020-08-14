import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {URLS_EVENTS} from '../../shared/constants';
import {Event} from '../../models/event.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class EventsService {

  constructor(private  http: HttpClient) {
  }

  getEventsCreatedByUser(userId: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_EVENTS.GET_BY_USER}/${userId}`;
    return this.http.get(url, httpOptions);
  }

  getEventsYesAssistance(userId: number): Observable<Object> {
    const url = `${environment.URL_BASE}/${URLS_EVENTS.GET_BY_USER}/${userId}/${URLS_EVENTS.YES_ASSISTANCE}`;
    return this.http.get(url, httpOptions);
  }

  createYesAssitance(eventId: number, userId: number) {
    const url =
      `${environment.URL_BASE}/${URLS_EVENTS.BASE}/${eventId}/${URLS_EVENTS.YES_ASSISTANCE}${URLS_EVENTS.ASSISTANCE_USER}${userId}`;
    return this.http.post(url, httpOptions);
  }

  createNotAssitance(eventId: number, userId: number) {
    const url =
      `${environment.URL_BASE}/${URLS_EVENTS.BASE}/${eventId}/${URLS_EVENTS.NOT_ASSISTANCE}${URLS_EVENTS.ASSISTANCE_USER}${userId}`;
    return this.http.post(url, httpOptions);
  }

  postEvent(event: Event) {
    const url = `${environment.URL_BASE}${URLS_EVENTS.BASE}`;
    return this.http.post(url, event, httpOptions);
  }

  updateScheduledEventState() {
    const url = `${environment.URL_BASE}${URLS_EVENTS.UPDATE_SCHEDULED_STATE}`;
    return this.http.put(url, httpOptions);
  }


}
