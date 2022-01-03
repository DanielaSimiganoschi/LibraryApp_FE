import { createAction, props } from '@ngrx/store';
import { Genre } from 'src/app/model/genre.model';

export const getGenres = createAction('[Genres] Get genres');

export const getGenresSuccess = createAction(
  '[Genres] Get genres success',
  (genres: ReadonlyArray<Genre>) => ({ genres })
);

export const addGenre = createAction(
  '[Genre] Add genre',
  (genre: Genre) => ({ genre })
);

export const addGenreSuccess = createAction(
  '[Genre] Add genre success',
  (genre: Genre) => ({ genre })
);

export const getGenreById = createAction(
  '[Genre] Get genre by id',
  (id: number) => ({ id })
);

export const getGenreByIdSuccess = createAction(
  '[Genre] Get genre by id success',
  (id: number) => ({ id })
);


export const updateGenre = createAction(
  '[Genre] Update genre',
  (genre: Genre) => ({ genre })
);

export const updateGenreSuccess = createAction(
  '[Genre] Update genre success',
  (genre: Genre) => ({ genre })
);


export const deleteGenre = createAction(
  '[Genre] Delete genre',
  (id: number) => ({ id })
);


