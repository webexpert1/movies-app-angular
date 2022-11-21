import { TestBed } from '@angular/core/testing';

import { MoviesDataService } from './movies-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IMovie } from './model/movie';

export const mockMovie = {
  "adult": false,
  "backdrop_path": "/kpUre8wWSXn3D5RhrMttBZa6w1v.jpg",
  "belongs_to_collection": {
      "id": 531799,
      "name": "Enchanted Collection",
      "poster_path": "/bgsrdjmwZOBbJ63FHNvRJeyd9P0.jpg",
      "backdrop_path": "/4FGS7pFVoYEVPzT6PIZxtR6ouM8.jpg"
  },
  "budget": 0,
  "genres": [
      {
          "id": 35,
          "name": "Comedy"
      },
      {
          "id": 10751,
          "name": "Family"
      },
      {
          "id": 14,
          "name": "Fantasy"
      }
  ],
  "homepage": "https://www.disneyplus.com/movies/disenchanted/5rnVhiRFkaqL",
  "id": 338958,
  "imdb_id": "tt1596342",
  "original_language": "en",
  "original_title": "Disenchanted",
  "overview": "Disillusioned with life in the city, feeling out of place in suburbia, and frustrated that her happily ever after hasn’t been so easy to find, Giselle turns to the magic of Andalasia for help. Accidentally transforming the entire town into a real-life fairy tale and placing her family’s future happiness in jeopardy, she must race against time to reverse the spell and determine what happily ever after truly means to her and her family.",
  "popularity": 405.646,
  "poster_path": "/4x3pt6hoLblBeHebUa4OyiVXFiM.jpg",
  "production_companies": [
      {
          "id": 2,
          "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
          "name": "Walt Disney Pictures",
          "origin_country": "US"
      },
      {
          "id": 1894,
          "logo_path": null,
          "name": "Josephson Entertainment",
          "origin_country": ""
      },
      {
          "id": 8909,
          "logo_path": null,
          "name": "Right Coast",
          "origin_country": "US"
      }
  ],
  "production_countries": [
      {
          "iso_3166_1": "US",
          "name": "United States of America"
      }
  ],
  "release_date": "2022-11-18",
  "revenue": 0,
  "runtime": 119,
  "spoken_languages": [
      {
          "english_name": "English",
          "iso_639_1": "en",
          "name": "English"
      }
  ],
  "status": "Released",
  "tagline": "Happily never after.",
  "title": "Disenchanted",
  "video": false,
  "vote_average": 7.841,
  "vote_count": 185
}

describe('MoviesDataService', () => {
  let service: MoviesDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MoviesDataService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a single movie', () => {
    service.fetchMovie(338958)
          .subscribe((movie: IMovie) => {
            expect(movie).not.toBe(null);
            expect(JSON.stringify(movie)).toEqual(JSON.stringify(mockMovie))
          })

  });
});
