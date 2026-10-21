import { Component, OnInit, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from '../../services/movie';
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

  movieSelected = output<number>();

  movies: Movie[] = [];

  ngOnInit(): void {

    console.log('MovieListComponent iniciado');

    this.loadMovies();

  }

  loadMovies(): void {

    this.movieService.getTopRatedMovies().subscribe({

      next: (response: MovieResponse) => {

        console.log('Respuesta completa:', response);
        console.log('Películas:', response.results);

        this.movies = response.results;

        console.log('Total películas:', this.movies.length);

      },

      error: (error) => {

        console.error('Error:', error);

      }

    });

  }

  selectMovie(id: number): void {

    this.movieSelected.emit(id);

  }

}