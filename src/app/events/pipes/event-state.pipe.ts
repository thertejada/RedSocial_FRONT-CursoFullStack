import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'eventState'
})
export class EventStatePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if (value == 'SCHEDULED') {
      return 'No iniciado';
    } else if (value == 'PASSED') {
      return 'Finalizado';
    } else if (value == 'IN_PROGRESS') {
      return '¡Hoy!';
    }
  }
}
