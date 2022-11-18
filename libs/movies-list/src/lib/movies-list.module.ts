import { RouterModule } from '@angular/router';
// import { SharedMaterialModule } from '@streams/shared-material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies/movies.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { SharedMaterialModule } from './../../../shared-material/lib/shared-material'
import { SharedMaterialModule } from '@streams/shared-material';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedMaterialModule],
  declarations: [MoviesComponent],
})
export class MoviesListModule {}
