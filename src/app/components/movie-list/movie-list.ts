
import {
  Component,
  OnInit,
  inject,
  output,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from '../../services/movie';
import {
  FavoritesService,
  Favorite
} from '../../services/favorites.service';
import { Movie } from '../../models/movie';
import { MovieResponse } from '../../models/movie-response';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  movieSelected = output<number>();
  movies: Movie[] = [];
  favorites: Favorite[] = [];
  favoriteMessage = '';
  favoriteError = '';
  savingMovieId: number | null = null;

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavorites();
  }

  loadMovies(): void {
    this.movieService.getTopRatedMovies().subscribe({
      next: (response: MovieResponse) => {
        this.movies = [...response.results];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar películas:', error);
      }
    });
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      }
    });
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.some(
      favorite => favorite.tmdb_id === movieId
    );
  }

  toggleFavorite(movie: Movie): void {
    this.favoriteMessage = '';
    this.favoriteError = '';
    this.savingMovieId = movie.id;

    if (this.isFavorite(movie.id)) {
      this.favoritesService.removeFavorite(movie.id).subscribe({
        next: () => {
          this.favorites = this.favorites.filter(
            favorite => favorite.tmdb_id !== movie.id
          );
          this.favoriteMessage = 'Película eliminada de favoritos.';
          this.savingMovieId = null;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.favoriteError =
            error.status === 404
              ? 'La película ya no está en favoritos.'
              : 'No se pudo eliminar la película.';
          this.savingMovieId = null;
          this.cdr.detectChanges();
        }
      });

      return;
    }

    this.favoritesService.addFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path || null
    }).subscribe({
      next: (favorite) => {
        this.favorites = [...this.favorites, favorite];
        this.favoriteMessage = 'Película agregada a favoritos.';
        this.savingMovieId = null;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.favoriteError =
          error.status === 409
            ? 'Esta película ya está en favoritos.'
            : 'No se pudo guardar la película.';
        this.savingMovieId = null;
        this.cdr.detectChanges();
      }
    });
  }

    selectMovie(id: number): void {
    this.movieSelected.emit(id);
  }
}
