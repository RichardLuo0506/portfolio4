import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularTooltipModule } from '@gustafguner/angular-tooltip';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { WindowRef } from './window-ref.service';
import { NavBarService } from './nav-bar/nav-bar.service';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { BlogPreviewComponent } from './home/blog-preview/blog-preview.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AmbientCanvasComponent } from './home/ambient-canvas/ambient-canvas.component';
import { ClampyModule } from '@clampy-js/ngx-clampy';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BlogPreviewComponent,
    ScrollSpyDirective,
    BlogComponent,
    NotFoundComponent,
    AmbientCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTooltipModule,
    ClampyModule
  ],
  providers: [WindowRef, NavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
