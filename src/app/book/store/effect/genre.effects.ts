import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, } from 'rxjs/operators';
import { GenreService } from 'src/app/service/genre.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addGenre, addGenreSuccess, deleteGenre, getGenres, getGenresSuccess, updateGenre, updateGenreSuccess } from '../action/genre.actions';


@Injectable()
export class GenreEffects {
  loadGenres$ = createEffect(() =>
    this.action$.pipe(
      ofType(getGenres),
      exhaustMap(() =>
        this.genreService.getGenres().pipe(
          map((genres) => getGenresSuccess(genres)),
          catchError((error) => {
            this._snackBar.open(`${error.message}`);
            return Observable.throw(error);
          })
        )
      )
    )
  );

  addGenre$ = createEffect(() =>
    this.action$.pipe(
      ofType(addGenre),
      concatMap(({ genre }) =>
        this.genreService.addGenre(genre).pipe(
          map((newGenre) => addGenreSuccess(newGenre), this.router.navigate(['books/genres']),
          ),
          catchError((error) => {
            this._snackBar.open(`${error.message}`);
            return Observable.throw(error);
          })
        )
      )
    ));


  updateGenre$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateGenre),
      concatMap(({ genre }) =>
        this.genreService.updateGenre(genre).pipe(
          map((newGenre) => updateGenreSuccess(newGenre), this.router.navigate(['books/genres'])
          ),
          catchError((error) => {
            this._snackBar.open(`${error.message}`);
           
            return Observable.throw(error);
          })
        )
      )
    ));


  deleteGenre$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteGenre),
      concatMap(({ id }) =>
        this.genreService.deleteGenre(id)
      ),
      catchError((error) => {
        this._snackBar.open(`${error.message}`);
        return Observable.throw(error);
      })
    ),
    { dispatch: false }
  );

  constructor(private action$: Actions, private genreService: GenreService, private router: Router, private _snackBar: MatSnackBar) { }
}


