import { IMovie } from '@streams/movies-data';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'streams-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  // @Input() set title(value: string) {
  //   this._movieTItle = value;
  // }
  // @Input() set imageUrl(value: string) {
  //   this._imageUrl = value;
  // }
  
  // @Input() set movie(movie: IMovie) {
  //   this._movie = movie;
  // }


  // _movieTItle!:;
  // _imageUrl = '';
  // _movie!: IMovie;

  @Input() movie!: IMovie;

  _movieTItle = '';
  _imageUrl = '';
  _movie!: IMovie;
  constructor() {}

  ngOnInit(): void {
  }

  getImageUrl(movie: IMovie): string {
    if(movie) {
      return 'https://image.tmdb.org/t/p/original' + movie.backdrop_path
    }
    return '';
  }
}
