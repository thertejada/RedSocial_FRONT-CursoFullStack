import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Event} from '../../models/event.model';

@Injectable()
export class EventCreateService {

  private _newEvent$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  addNewEvent(b: boolean): void {
    this._newEvent$.next(b);
  }

  newEvent$() {
    return this._newEvent$.asObservable();
  }
}
