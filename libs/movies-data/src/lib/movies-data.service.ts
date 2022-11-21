import { environment } from './../../../../apps/streams/src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie, IMovies } from './model/movie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  baseURL = environment.baseURL; 
  constructor(private http: HttpClient) { }

  fetchMovies(): Observable<IMovies> { 
    return this.http.get<IMovies>(`${this.baseURL}/discover/movie`, {
      params: {
        api_key: environment.apiKey
      }
    })
  }

  fetchMovie(id: number): Observable<IMovie>  {
    return this.http.get<IMovie>(`${this.baseURL}/movie/${id}`, {
      params: {
        api_key: environment.apiKey
      }
    })
  }

  fetchTrending(): Observable<IMovies> {
    return this.http.get<IMovies>(`${this.baseURL}/trending/all/day`, {
      params: {
        api_key: environment.apiKey
      }
    })
  }
 
  fetchTopRated(): Observable<IMovies> {
    return this.http.get<IMovies>(`${this.baseURL}/movie/top_rated`, {
      params: {
        api_key: environment.apiKey
      }
    })
  }
  
}
