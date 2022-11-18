import { SharedMaterialModule } from '@streams/shared-material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, SharedMaterialModule],
  declarations: [MovieDetailComponent],
})
export class MovieDetailModule {}
