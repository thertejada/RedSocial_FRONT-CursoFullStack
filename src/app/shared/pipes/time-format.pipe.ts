import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let date = new Date(value);
    return date
      .getHours().toString()
      .concat(':', date.getMinutes() == 0 ? '00' : date.getMinutes().toString());
  }
}
