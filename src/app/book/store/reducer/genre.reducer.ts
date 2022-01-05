import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Genre } from 'src/app/model/genre.model';
import { addGenreSuccess, deleteGenre, getGenreByIdSuccess, getGenresSuccess, updateGenreSuccess } from '../action/genre.actions';


export interface GenreState {
  genres: ReadonlyArray<Genre>;
}

const initialState: ReadonlyArray<Genre> = [];



export const genreReducer = createReducer(
  initialState,
  on(getGenresSuccess, (state, { genres }) => [...genres]),
  on(addGenreSuccess, (state, { genre }) => [...state, genre]),
  on(updateGenreSuccess, (state, { genre }) => [...state, genre]),
  on(deleteGenre, (state) => [...state])
)

