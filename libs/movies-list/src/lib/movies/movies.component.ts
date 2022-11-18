import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ElementRef, HostListener, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, fromEvent, map, Observable, startWith, Subscription, switchMap, tap } from 'rxjs';
import { IMovie, IMovies, MoviesDataService } from '@streams/movies-data'
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  DOWN_ARROW = 40,
  UP_ARROW = 38,
  TAB =  9,
  ENTER = 13
}

@Component({
  selector: 'streams-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  ]
})
export class MoviesComponent implements OnInit {
  myControl = new FormControl('');
  options: any[] = []
  filteredOptions!: Observable<string[]>;
  selectedMovie!: IMovie | null;


  title = 'movies-app';
  trendingMovies$!: Subscription;
  topRatedMovies$!: Subscription;
  allMovies$!: Subscription;

  trendingMovies!: IMovies;
  topRatedMovies!: IMovies;
  allMovies!: IMovies | undefined;
  isLoading = true;  
  currentTab!: number;
  @ViewChildren('allMoviesss') allMoviesRef!:QueryList<ElementRef>;

  linkIndex = 0;
  startIndex: number = 0;
  currentSectionIndex: number = 0;
  
  constructor(private movieDataService: MoviesDataService, private cdr: ChangeDetectorRef, private router: Router) {}
    
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value || '');
      }),
    );
    this.getMovies();
    this.getTopRatedMovies();
    this.getTrendingMovies();
  }

  onKeyUp(event: KeyboardEvent, movie: IMovie) {
    console.log('key Up', movie, event)
    if(event.code === 'Enter') {
      this.router.navigate([`/movies/${movie.id}`])
    }

  }

  getFilterdValue(option: any) {
    this.selectedMovie = option;
    return option
  }
  private _filter(value: any): any {
    const filterValue = value.toLowerCase();

    if(filterValue === '') {
      this.selectedMovie = null;
      return
    }

    if(this.options)
       return this.options.filter((option: any) => option.title.toLowerCase().includes(filterValue));
  }

  addClass(i: number) {
    return String(i);
  }

  currentId = 0;
  currentFocusedElement!: ElementRef | undefined
 

  navigateUsingKey(event: KeyboardEvent) {
    switch (event.keyCode) {
        case 38: // this is the ascii of arrow up        
          this.linkIndex === -1 ?  this.linkIndex = 0 : this.linkIndex-- ;
          // each section traversal...
          if(this.currentSectionIndex === 0){
            this.downTraverse(2,this.topRatedMovies.results?.length);
          } else if(this.currentSectionIndex === 2){
            this.downTraverse(1, this.trendingMovies?.results?.length);
          } else if(this.currentSectionIndex === 1){
            this.downTraverse(0, this.allMovies?.results?.length)
          }
        break;
  
        case 40: // this is the ascii of arrow down
          if(this.currentSectionIndex === 0){
            this.upTraverse(1, this.topRatedMovies!.results!.length);
          } else if(this.currentSectionIndex === 1){
              this.upTraverse(2, this.trendingMovies!.results!.length);
          } else if(this.currentSectionIndex === 2){
              this.upTraverse(0, this.allMovies!.results!.length);
          }
          this.linkIndex++;
        break;       
    }
  }
  
  downTraverse(sectionIndex:number, listLength: any){
  // calls when DOWN key press...
    this.linkIndex === -1 ? (this.currentSectionIndex = sectionIndex, this.linkIndex = listLength - 1) : '';
  }
  upTraverse(sectionIndex: number, listLength: number){
    // calls when UP key press...
    listLength-1 <= this.linkIndex ? (this.currentSectionIndex = sectionIndex, this.linkIndex = -1) : '';
  }

  getTrendingMovies() {
    this.allMovies$ = this.movieDataService.fetchTrending()
      .pipe(finalize(() => {
          this.isLoading = false;
        }))
      .subscribe({
        next: (res) => {
          if(res.results) {
          this.trendingMovies = res;
          }
          this.isLoading = false;
        },
        error:(e) => {

        }
      })
  }

  getMovies() {
    this.allMovies$ = this.movieDataService.fetchMovies()
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe({
          next: (res) => {
            if(res.results) {
            this.allMovies = res;
            this.options = [...res.results]
            this.isLoading = false;
            }
          },
          error:(e) => {

          }
        })
  }

  getTopRatedMovies() {
    this.topRatedMovies$ = this.movieDataService.fetchTopRated()
        .pipe(finalize(() => {
          this.isLoading = false;
        }))
        .subscribe({
          next: (res) => {
            if(res.results) {
            this.topRatedMovies = res;
            this.isLoading = false;
            }
          },
          error:(e) => {
            this.isLoading = false;
          },
          
        })
  }

  ngOnDestroy() {
    if(this.allMovies$) {
      this.allMovies$.unsubscribe();
    }
    if(this.trendingMovies$) {
      this.trendingMovies$.unsubscribe();
    }
    if(this.topRatedMovies$) {
      this.topRatedMovies$.unsubscribe();
    }
  }

}
