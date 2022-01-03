import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, takeUntil, tap } from 'rxjs/operators';
import { GenreService } from 'src/app/service/genre.service';
import { addGenre, addGenreSuccess, deleteGenre, getGenreById, getGenreByIdSuccess, getGenres, getGenresSuccess, updateGenre } from '../action/genre.actions';


@Injectable()
export class GenreEffects {
  loadGenres$ = createEffect(() =>
    this.action$.pipe(
      ofType(getGenres),
      exhaustMap(() =>
        this.genreService.getGenres().pipe(
          map((genres) => getGenresSuccess(genres))
        )
      )
    )
  );

  addGenre$ = createEffect(() =>
    this.action$.pipe(
      ofType(addGenre),
      concatMap(({ genre }) =>
        this.genreService.addGenre(genre).pipe(
          map((newGenre) => addGenreSuccess(newGenre))
        )
      )
    )
  );

  updateGenre$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateGenre),
      concatMap(({ genre }) =>
        this.genreService.updateGenre(genre).pipe(
          map((newGenre) => addGenreSuccess(newGenre))
        )
      )
    )
  );


  deleteGenre$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteGenre),
      concatMap(({ id }) =>
        this.genreService.deleteGenre(id)
      )
    ), { dispatch: false }
  );

  constructor(private action$: Actions, private genreService: GenreService) { }
}