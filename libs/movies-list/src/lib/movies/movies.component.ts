import { ChangeDetectorRef, Component, OnInit, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize, map, Observable, startWith, Subscription } from 'rxjs';
import { IMovie, IMovies, MoviesDataService } from '@streams/movies-data'

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
  
  constructor(private movieDataService: MoviesDataService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.allMoviesRef.changes.subscribe(() => {
      console.log("Item elements are now in the DOM!", this.allMoviesRef.length);
      // this.allMoviesRef.find(x => x.).
      // const htmlElement = document.getElementById(this.selectedItemId);

    });
  }
    
  ngOnInit(): void {
    // this.trendingMovies$ = this.movieDataService.fetchTrending();
    // this.spinner.show();
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.getMovies();
    this.getTopRatedMovies();
    this.getTrendingMovies();
  }

  getFilterdValue(option: any) {
    console.log('option is ', option.title);
    this.selectedMovie = option;
    return option
  }
  private _filter(value: any): any {
    console.log('hi', this.options)
    const filterValue = value.toLowerCase();

    if(filterValue === '') {
      this.selectedMovie = null;
      return
    }

    if(this.options)
       return this.options.filter((option: any) => option.title.toLowerCase().includes(filterValue));
  }

  // getSelectedMovie(movie: IMovie) {
  //   // this.selectedMovie = movie;
  //   return movie?.title
  // }

  addClass(i: number) {
    return String(i);
  }

  setFocus() {
    console.log('focusing')
  }

  currentId = 0;
  currentFocusedElement!: ElementRef | undefined
  @HostListener('keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
   
    // console.log(event, 'enter', this.allMoviesRef) 
    // if (event.keyCode === KEY_CODE.DOWN_ARROW) {
    //   console.log('DOWN arrow');
    // }

    // if (event.keyCode === KEY_CODE.UP_ARROW) {
    //   console.log('uP arrow');
    // }

    // if (event.keyCode === KEY_CODE.TAB) { 
    //   console.log('tab arrow');
    //   let id = 0;
    //   const elementRef = this.allMoviesRef.find((item, index) => index === this.currentId);
    //   // console.log('ID is', id)\
    //   this.currentFocusedElement = elementRef;
    //   // console.log('element is', elementRef)
    //   // elementRef?.nativeElement.focus();
    //   setTimeout(() => elementRef?.nativeElement.focus(), 0);

    //   // console.log(event);
    //   // let navbar = (document.getElementById(`${id}`));
    //   // navbar?.focus()
    //   // console.log('nav is', navbar, id)
    //   console.log(elementRef?.nativeElement.parentNode)
    //   this.currentId = this.currentId + 1
    //   // id += 1;
    //   // console.log(id, 'id')
    //   this.cdr.detectChanges();

    // }

    // if(event.keyCode === KEY_CODE.ENTER) {
    //   console.log('enter enter', this.currentFocusedElement)
    // }

    // if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
    //   let id = 0;
    //   console.log('right arrow');
    //   console.log(event);
    //   let navbar = (document.getElementById(`${id}`));
    //   navbar?.focus()
    //   console.log('nav is', navbar, id)
    //   id = ++id
    //   this.cdr.detectChanges();

    //   let position = (document.documentElement.scrollTop || document.body.scrollTop);

    // }

    // if (event.keyCode === KEY_CODE.LEFT_ARROW) {
    //   // this.decrement();
    //   console.log('right arrow');
    // }
  }
  

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
          // this.spinner.hide();
          // this.isLoading = false;
          console.log('tre',res.results)
        },
        error:(e) => {

        }
      })
  }

  getMovies() {
    this.allMovies$ = this.movieDataService.fetchMovies()
        // .pipe(finalize(() => {
        //   this.isLoading = false;
        // }))
        .subscribe({
          next: (res) => {
            if(res.results) {
            this.allMovies = res;
            this.options = res.results
            // this.isLoading = false;
            }
            console.log('options', this.options)
          },
          error:(e) => {

          }
        })
        // .add(() => {
        //   console.log('top')
        // })
  }

  getTopRatedMovies() {
    this.topRatedMovies$ = this.movieDataService.fetchTopRated()
        // .pipe(finalize(() => {
        //   this.isLoading = false;
        // }))
        .subscribe({
          next: (res) => {
            if(res.results) {
            this.topRatedMovies = res;
            // this.isLoading = false;
            }
            console.log('top',res.results)
          },
          error:(e) => {

          },
          
        })
        // .add(() => {
        //   console.log('top')
        // })
  }

  // navigateToDetail(id: number) {
  //   console.log(id)
  // }

  // ngOnDestroy() {
  //   if(this.allMovies$) {
  //     this.allMovies$.unsubscribe();
  //   }
  //   if(this.trendingMovies$) {
  //     this.trendingMovies$.unsubscribe();
  //   }
  //   if(this.topRatedMovies$) {
  //     this.topRatedMovies$.unsubscribe();
  //   }
  // }

}
