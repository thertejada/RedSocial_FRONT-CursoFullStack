import {Component, OnInit, ViewChild} from '@angular/core';
import {EventsService} from '../../service/events.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Event} from '../../../models/event.model';
import {NgModel} from '@angular/forms';
import {EventCreateService} from '../../service/event-create.service';

@Component({
  selector: 'event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  newEvent: Event = new Event();
  modalDisplay = 'none';
  dateTomorrow;

  @ViewChild('formEvento') form;

  constructor(private eventService: EventsService,
              private loginService: AuthService,
              private createService: EventCreateService) {
    let currentDate = new Date();
    this.dateTomorrow = currentDate.setDate(currentDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.eventService.updateScheduledEventState().subscribe();
  }

  createEvent(newEvent: Event) {
    if (newEvent.name != null && newEvent.description != null && newEvent.eventDate != null) {
      newEvent.user = this.loginService.getValueUserLogin();
      this.formatDate(this.newEvent);
      this.eventService.postEvent(this.newEvent).subscribe(
        () => '',
        error => console.error(error),
        () => {
          console.debug('Evento creado: '.concat(newEvent.name));
          this.form.reset();
          this.onCloseHandled();
          this.createService.addNewEvent(true);
          this.eventService.updateScheduledEventState().subscribe();
        }
      );
    }
  }

  /**
   * Convertir la fecha del evento a la adecuada para enviar a la api rest
   */
  private formatDate(event: Event) {
    let date = event.eventDate.toString();
    event.eventDate = date.substring(0, 10) + ' ' + date.substring(11) + ':00';
  }

  openModal() {
    this.modalDisplay = 'block';
  }

  onCloseHandled() {
    this.modalDisplay = 'none';
    this.form.reset();

  }

  getTodayDateTimezone() {
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 2));
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
}
