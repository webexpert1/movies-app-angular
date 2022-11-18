import { IMovie, MoviesDataService } from '@streams/movies-data';
import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import icKeyboardBackspace from '@iconify/icons-ic/keyboard-backspace'

@Component({
  selector: 'streams-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  isLoading = true;
  movieDetail$!: Observable<IMovie>;
  public icKeyboardBackspace = icKeyboardBackspace;
  constructor(private route: ActivatedRoute, private router: Router, private movieDataService: MoviesDataService) {}

  ngOnInit(): void {
    console.log('detail page');
    this.getMovieId();
  }

  getMovieId() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(params.has('id')) {
        this.movieId = Number(params.get('id'));
        this.getMovieDetails(this.movieId);
      }
    })
  }

  goBack() {
    this.router.navigate(['/'])
  }

  getMovieDetails(id: number) {
    this.movieDetail$ = this.movieDataService.fetchMovie(this.movieId).pipe(
      map((res) => res),
      catchError((_e) => {
        this.goBack();
        this.isLoading = false;
        return throwError(() => new Error(_e));
      }),
      finalize(() => {
        this.isLoading = false;
      })
    )
  }

}
