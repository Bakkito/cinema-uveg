
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favorite {
  id?: number;
  tmdb_id: number;
  titulo: string;
  poster_path: string | null;
  fecha_agregado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private http = inject(HttpClient);
  private apiUrl = '/api/favoritas';

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.apiUrl);
  }

  addFavorite(movie: {
    id: number;
    title: string;
    poster_path: string | null;
  }): Observable<Favorite> {
    return this.http.post<Favorite>(this.apiUrl, {
      tmdb_id: movie.id,
      titulo: movie.title,
      poster_path: movie.poster_path
    });
  }

  removeFavorite(tmdbId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${tmdbId}`
    );
  }
}
