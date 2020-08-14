import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from '../app-routing.module';
import {AuthService} from './services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { UserImagePipe } from './pipes/user-image.pipe';
import { NavbarNamePipe } from './pipes/navbar-name.pipe';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, DateFormatPipe, TimeFormatPipe, UserImagePipe, NavbarNamePipe],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NavbarComponent,
        FooterComponent,
        BrowserAnimationsModule,
        DateFormatPipe,
        TimeFormatPipe,
        UserImagePipe,
    ],
  providers: [
    AuthService
  ]
})
export class SharedModule {
}
