import {Pipe, PipeTransform} from '@angular/core';

const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let date = new Date(value);
    return date
      .getDate().toString()
      .concat(' de ', monthNames[date.getMonth()], ' de ', date.getFullYear().toString());
  }
}
