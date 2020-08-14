import {Pipe, PipeTransform} from '@angular/core';

const navbarNames = ['Inicio', 'Mi perfil', 'Mis amigos', 'Eventos'];

@Pipe({
  name: 'navbarName'
})
export class NavbarNamePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return navbarNames[value-1];
  }

}
