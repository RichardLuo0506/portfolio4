import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { WindowRef } from './window-ref.service';
import { NavBarService } from './nav-bar/nav-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ScrollSpyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WindowRef, NavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
