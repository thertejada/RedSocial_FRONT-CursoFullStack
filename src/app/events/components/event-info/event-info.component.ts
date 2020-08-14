import {Component, OnInit} from '@angular/core';
import {Event} from '../../../models/event.model';
import {AuthService} from '../../../shared/services/auth.service';
import {Assistance} from '../../../models/assistance.model';
import {AssistanceStateEnum} from '../../../models/enums/AssistanceStateEnum';
import {EventsService} from '../../service/events.service';

@Component({
  selector: 'event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  event: Event;
  btnActivated: number;

  constructor(private service: EventsService, private loginService: AuthService) {
  }

  ngOnInit(): void {
  }

  cargarEvent(event: Event) {
    this.event = event;
  }

  getMyAssistance(event: Event): Assistance {
    let myAssistance = event.assistances.find(a => a.user.id == this.loginService.getValueUserLogin().id);
    if (myAssistance == undefined) {
      myAssistance = new Assistance();
      myAssistance.state = AssistanceStateEnum.NO;
    }
    return myAssistance;
  }

  createYesAssistance(event: Event) {
    this.service.createYesAssitance(event.id, this.loginService.getValueUserLogin().id).subscribe(
      () => '',
      error => console.error(error),
      () => this.actualizarAssistanceMessage(AssistanceStateEnum.YES)
    );
  }

  createNotAssistance(event: Event) {
    this.service.createNotAssitance(event.id, this.loginService.getValueUserLogin().id).subscribe(
      () => '',
      error => console.error(error),
      () => this.actualizarAssistanceMessage(AssistanceStateEnum.NO)
    );
  }

  /**
   * Cambiar tu asistencia del message al estado contrario NO/YES para no recargar la lista
   */
  private actualizarAssistanceMessage(state: AssistanceStateEnum) {
    let assistance = this.getMyAssistance(this.event);
    assistance.state = state;
    if (assistance.user == undefined) {
      assistance.user = this.loginService.getValueUserLogin();
    }
    this.event.assistances = this.event.assistances.filter(a => a.user.id != this.loginService.getValueUserLogin().id);
    this.event.assistances.push(assistance);
    this.cargarEvent(Object.create(this.event));
  }

  allAssistanceAreStateNot() {
    return this.event.assistances.filter(a => a.state.toString() == 'NO').length == this.event.assistances.length;
  }
}
