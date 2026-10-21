
import {
  Component,
  effect,
  inject,
  input,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { TMDB_CONFIG } from '../../config/tmdb.config';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetail {
  movieId = input<number | null>(null);

  private movieService = inject(MovieService);

  movie = signal<Movie | null>(null);
  loading = signal(false);
  errorMessage = signal('');

  imageUrl = TMDB_CONFIG.imageUrl;

  constructor() {
    effect((onCleanup) => {
      const id = this.movieId();

      this.movie.set(null);
      this.errorMessage.set('');

      if (id === null) {
        this.loading.set(false);
        return;
      }

      this.loading.set(true);

      const subscription = this.movieService
        .getMovieDetails(id)
        .subscribe({
          next: (movie) => {
            this.movie.set(movie);
            this.loading.set(false);
          },
          error: (err) => {
            console.error('Error al cargar detalles:', err);
            this.errorMessage.set(
              'No fue posible cargar los detalles de esta película.'
            );
            this.loading.set(false);
          }
        });

      onCleanup(() => subscription.unsubscribe());
    });
  }
}
