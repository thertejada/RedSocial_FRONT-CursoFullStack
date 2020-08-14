import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navbarActivated: number;
  isShown:boolean = false;

  constructor(private router: Router) {
    // Recuperar path router
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(event => {
      if (event != null) {
        this.activarSelectedNavbar(event.url);
      }
    });
  }

  private activarSelectedNavbar(url: string) {
    if (url == '/home' || url == '/') {
      this.navbarActivated = 1;
    } else if (url == '/profile') {
      this.navbarActivated = 2;
    } else if (url == '/friends') {
      this.navbarActivated = 3;
    } else if (url == '/events') {
      this.navbarActivated = 4;
    }
  }

  ngOnInit(): void {
  }

}
