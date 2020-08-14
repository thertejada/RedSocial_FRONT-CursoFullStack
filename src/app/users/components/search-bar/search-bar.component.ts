import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EMPTY, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'users-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchInputValueString: string = '';
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;
  @Output()
  searchValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    /**
     debounceTime: espera el tiempo en ms hasta que permita nuevos cambios
     distinctUntilChanges: no permite que la misma entrada pase dos veces seguidas
     switchMap: toma el último observable de la cadena para que no obtenga múltiples resultados a la vez
     */
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(1000),
      //distinctUntilChanged(),
      switchMap(searchInputValue => {
        this.searchValue.emit(searchInputValue);
        return EMPTY;
      })
    ).subscribe();
  }

  inputSearchKeyEvent($event: any) {
    this.searchSubject.next($event.target.value);
  }

  resetInputSearchValue() {
    this.searchSubject.next('');
    this.searchInputValueString = '';
  }

}
