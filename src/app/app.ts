import { Component, signal } from '@angular/core';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetail } from './components/movie-detail/movie-detail';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MovieList,
    MovieDetail
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  selectedMovieId = signal<number | null>(null);

  onMovieSelected(id: number): void {
    this.selectedMovieId.set(id);
  }

}