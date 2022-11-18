import { SharedModule } from './../../../../libs/shared/src/lib/shared.module';
import { MovieDetailComponent } from '@streams/movie-detail';
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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OverlayModule } from "@angular/cdk/overlay";
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { MatTooltipModule, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Route[] = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieDetailComponent},
  { path: '**', redirectTo: 'movies'} 
]
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, OverlayModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes), SharedModule],
  providers: [   ],
  bootstrap: [AppComponent],
})
export class AppModule {}
