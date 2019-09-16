import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ScrollSpyDirective } from './scroll-spy.directive';
import { WindowRef } from './window-ref.service';
import { NavBarService } from './nav-bar/nav-bar.service';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { BlogPreviewComponent } from './home/blog-preview/blog-preview.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    BlogPreviewComponent,
    ScrollSpyDirective,
    BlogComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WindowRef, NavBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
