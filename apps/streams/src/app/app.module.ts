// import { SharedMaterialModule } from '@streams/shared-material';
import { MoviesListModule, MoviesComponent } from '@streams/movies-list';
// import { MoviesComponent } from '@streams/movies-list'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Route[] = [
  { path: '', component: MoviesComponent }
]
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
