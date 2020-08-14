import {Component, OnInit, ViewChild} from '@angular/core';
import {EventsService} from '../../service/events.service';
import {AuthService} from '../../../shared/services/auth.service';
import {EventListComponent} from '../event-list/event-list.component';
import {Event} from '../../../models/event.model';
import {RelationsShipService} from '../../../users/services/relations-ship.service';
import {UserRelationShip} from '../../../models/relation-ship.model';
import {EventCreateService} from '../../service/event-create.service';

@Component({
  selector: 'event-selection',
  templateUrl: './event-selection.component.html',
  styleUrls: ['./event-selection.component.scss']
})
export class EventSelectionComponent implements OnInit {

  @ViewChild(EventListComponent, {static: false}) eventListComponent: EventListComponent;
  btnActivated: number = 1;
  onlyShowNotFinished: boolean = false;

  constructor(private service: EventsService,
              private loginService: AuthService,
              private relationService: RelationsShipService,
              private eventCreateService: EventCreateService) {
  }

  ngOnInit(): void {
    this.myEvents();
    this.eventCreateService.newEvent$().subscribe(
      (update: boolean) => {
        if (update) {
          this.myEvents();
          this.eventCreateService.addNewEvent(false);
        }
      }
    );
  }

  private cargarListaEventos() {
    if (this.btnActivated == 1) {
      this.myEvents();
    } else if (this.btnActivated == 2) {
      this.friendsEvents();
    } else if (this.btnActivated == 3) {
      this.eventsYesAssistance();
    }
  }

  myEvents() {
    this.btnActivated = 1;
    this.loginService.userLogin().subscribe(
      user => {
        if (user.id != undefined) {
          this.clearEventListComponent();
          this.service.getEventsCreatedByUser(user.id).subscribe(
            (events: Array<Event>) => this.mandarArrayEventos(events),
            error => this.errorNotFoundEvents(error)
          );
        }
      }
    );
  }

  friendsEvents() {
    this.btnActivated = 2;
    let arrayRelations: Array<UserRelationShip> = new Array<UserRelationShip>();
    let arrayEvents: Array<Event> = new Array<Event>();
    let contadorNumberRelations;

    this.loginService.userLogin().subscribe(
      user => {
        if (user.id != undefined) {
          this.clearEventListComponent();
          // Obtener amigos
          this.relationService.getRelationsFriend(user.id).subscribe(
            (relation: UserRelationShip) => {
              arrayRelations = arrayRelations.concat(relation);
            },
            error => this.errorNotFoundEvents(error)
          ).add(() => {
            // Cuando están todos en el array, obtener eventos de cada amigo.
            // Utilizamos la variable auxiliar contador para saber si están todos
            contadorNumberRelations = arrayRelations.length;
            arrayRelations.forEach(
              relation => {
                this.service.getEventsCreatedByUser(relation.userFriend.id).subscribe(
                  (friendEvents: Array<Event>) => {
                    arrayEvents = arrayEvents.concat(friendEvents);
                  },
                  error => this.errorNotFoundEvents(error)
                ).add(() => {
                  // Se envía cuando el contador es 0, es decir, se han recuperado todos los eventos de todos los amigos
                  contadorNumberRelations--;
                  if (contadorNumberRelations == 0) {
                    this.mandarArrayEventos(arrayEvents);
                  }
                });
              }
            );
          });
        }
      }
    );
  }

  eventsYesAssistance(): void {
    this.btnActivated = 3;
    this.loginService.userLogin().subscribe(
      user => {
        if (user.id != undefined) {
          this.clearEventListComponent();
          this.service.getEventsYesAssistance(user.id).subscribe(
            (events: Array<Event>) => this.mandarArrayEventos(events),
            error => this.errorNotFoundEvents(error)
          );
        }
      }
    );
  }

  private errorNotFoundEvents(error) {
    if (error.status == 404) {
      console.debug('No hay eventos con el parámetro solicitado');
      this.mandarArrayEventos(new Array<Event>());
    }
  }

  updateBoolean() {
    this.onlyShowNotFinished = !this.onlyShowNotFinished;
    this.cargarListaEventos();
  }

  // --- EventListComponent ---

  private mandarArrayEventos(events: Array<Event>) {
    this.eventListComponent.btnActivated = this.btnActivated;
    this.eventListComponent.cargarEventos(this.filtrarEventos(events));
  }

  /**
   * Filtrar según onlyShowNotFinished
   */
  private filtrarEventos(events: Array<Event>) {
    if (events != undefined) {
      return this.onlyShowNotFinished ? events.filter(e => e.state.toString() != 'PASSED') : events;
    }
    return events;
  }

  private clearEventListComponent(): void {
    if (this.eventListComponent !== undefined) {
      this.mandarArrayEventos(undefined);
    }
  }

}
