import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ElementRef, HostListener, QueryList, ViewChildren, ViewChild, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, finalize, fromEvent, map, Observable, startWith, Subscription, switchMap, tap } from 'rxjs';
import { IMovie, IMovies, MoviesDataService } from '@streams/movies-data'
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
import { ActiveDescendantKeyManager, Highlightable, ListKeyManagerOption } from '@angular/cdk/a11y';
import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { BehaviorSubject } from "rxjs";
import { SwiperComponent } from "swiper/angular";



// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

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

  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  show!: boolean;
  thumbs: any;
  slides$ = new BehaviorSubject<string[]>(['']);


  linkIndex = 0;
  startIndex: number = 0;
  currentSectionIndex: number = 0;
  private keyManager!: ActiveDescendantKeyManager<any>;
  responsiveOptions: any =  [];
  
  constructor(private movieDataService: MoviesDataService, private cdr: ChangeDetectorRef, private router: Router,  private ngZone: NgZone) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
    
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

  ngAfterViewInit() {
    if(this.allMovies) {
      this.keyManager = new ActiveDescendantKeyManager(this.allMovies as any)
      .withWrap()
      .withTypeAhead();
    }
   
  }


  getSlides() {
    this.slides$.next(Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`));
  }

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }
  controlledSwiper: any;
  setControlledSwiper(swiper: any) {
    this.controlledSwiper = swiper;
  }

  indexNumber = 1;
  exampleConfig = { slidesPerView: 3 };
  slidesPerView: number = 4;
  pagination: any = false;

  slides2 = ['slide 1', 'slide 2', 'slide 3'];
  replaceSlides() {
    this.slides2 = ['foo', 'bar'];
  }

  togglePagination() {
    if (!this.pagination) {
      this.pagination = { type: 'fraction' };
    } else {
      this.pagination = false;
    }
  }

  navigation = false;
  toggleNavigation() {
    this.navigation = !this.navigation;
  }

  scrollbar: any = false;
  toggleScrollbar() {
    if (!this.scrollbar) {
      this.scrollbar = { draggable: true };
    } else {
      this.scrollbar = false;
    }
  }
  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 },
  };

  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
  virtualSlides = Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`);

  breakPointsToggle!: boolean;
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 },
    };
  }

  slidesEx = ['first', 'second'];

  onSlideChange(swiper: any) {
    if (swiper.isEnd) {
      // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
      this.ngZone.run(() => {
        this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`];
      });
    }
  }


  onKeyUp(event: KeyboardEvent, movie: IMovie) {
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

  getImageUrl(movie: IMovie): string {
    if(movie) {
      return 'https://image.tmdb.org/t/p/original' + movie.backdrop_path
    }
    return '';
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
