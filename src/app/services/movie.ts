import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TMDB_CONFIG } from '../config/tmdb.config';
import { MovieResponse } from '../models/movie-response';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${TMDB_CONFIG.bearerToken}`,
    'Accept': 'application/json'
  });

  getTopRatedMovies(): Observable<MovieResponse> {

    return this.http.get<MovieResponse>(
      `${TMDB_CONFIG.apiUrl}/movie/top_rated?language=es-MX&page=1`,
      {
        headers: this.headers
      }
    );

  }

  getMovieDetails(id: number): Observable<Movie> {

    return this.http.get<Movie>(
      `${TMDB_CONFIG.apiUrl}/movie/${id}?language=es-MX`,
      {
        headers: this.headers
      }
    );

  }

}