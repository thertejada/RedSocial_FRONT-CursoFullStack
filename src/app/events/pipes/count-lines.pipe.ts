import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'CountSizeTextarea'
})
export class CountSizeTextareaPipe implements PipeTransform {

  transform(value: string, ...args: string[]): number {
    return (value.match(/\n/g) || '').length + 1 + this.largueString(value);
  }

  /**
   * Si el string es muy largo pero no tiene salto de linea tambíén hay que tenerlo en cuenta
   */
  largueString(value: string): number {
    return Math.round((value.split(/\r\n|\r|\n/)[0].length) / 50);
  }

}
