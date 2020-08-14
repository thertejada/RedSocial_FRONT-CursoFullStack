import {Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../models/event.model';
import {EventInfoComponent} from '../event-info/event-info.component';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @ViewChild(EventInfoComponent, {static: false}) eventInfoComponent: EventInfoComponent;
  events: Array<Event>;
  btnActivated: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Array recibido del componente padre: event-list
   */
  cargarEventos(events: Array<Event>): void {
    if (events != undefined) {
      this.events = this.ordenarEvents(events);
    } else {
      this.events = events;
    }
    // Reiniciar EventInfoComponent
    if (this.eventInfoComponent != undefined) {
      this.mandarEvento(undefined);
    }
  }

  private ordenarEvents(events: Array<Event>): Array<Event> {
    return events.sort((a, b) =>
      new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
  }

  onClickEvent(event: Event) {
    this.mandarEvento(event);
  }

  /**
   * Cargar evento en el componente hijo 'event-info'
   */
  private mandarEvento(event: Event) {
    this.eventInfoComponent.btnActivated = this.btnActivated;
    this.eventInfoComponent.cargarEvent(event);
  }
}
