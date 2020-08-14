import {Pipe, PipeTransform} from '@angular/core';

const timeIntervals = {
  'año': 31536000,
  'mes': 2592000,
  'semana': 604800,
  'día': 86400,
  'hora': 3600,
  'minuto': 60,
  'segundo': 1,
};

@Pipe({
  name: 'fechaMessage'
})
export class FechaMessagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value) {
      const differenceInSeconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      // less than 30 seconds ago will show as 'Just now'
      if (differenceInSeconds < 30) {
        return 'Hace unos segundos';
      }

      // All values are in seconds
      let counter;
      for (const dateType in timeIntervals) {
        counter = Math.floor(differenceInSeconds / timeIntervals[dateType]);
        if (counter > 0) {
          if (counter === 1) {
            // singular
            return 'Hace ' + counter + ' ' + dateType;
          } else {
            // plural
            if (dateType.toString() == "mes") {
              return 'Hace ' + counter + ' ' + dateType + 'es';
            }
            return 'Hace ' + counter + ' ' + dateType + 's';
          }
        }

      }

    }
    return value;
  }

}

/**
 < 1h : Justo ahora
 > 1h: Hace x horas
 +24h: Hace x dias





 */
