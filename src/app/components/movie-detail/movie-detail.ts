import {
  Component,
  effect,
  inject,
  input
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

  movie?: Movie;

  imageUrl = TMDB_CONFIG.imageUrl;

  constructor(){

    effect(() => {

      const id = this.movieId();

      if(id){

        this.loadMovie(id);

      }

    });

  }

  loadMovie(id:number){

    this.movieService.getMovieDetails(id)
      .subscribe({

        next:(movie)=>{

          this.movie = movie;

        },

        error:(err)=>{

          console.error(err);

        }

      });

  }

}