
import { createSelector } from '@ngrx/store';
import { Genre } from 'src/app/model/genre.model';
import { GenreState } from '../reducer/genre.reducer';

export const genreSelector = createSelector(
  (state: GenreState) => state.genres,
  (genres: ReadonlyArray<Genre>) => genres
);

export const genreByIdSelector = (id:number) => createSelector(
  genreSelector,
  genres => genres.filter(genre => genre.id == id)
);