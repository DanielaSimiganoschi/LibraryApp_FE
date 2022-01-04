import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BooksAllComponent } from './books-all/books-all.component';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { GenresAllComponent } from './genres-all/genres-all.component';
import { AddEditGenreComponent } from './add-edit-genre/add-edit-genre.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { AddIsbnComponent } from './add-isbn/add-isbn.component';
import { BooksFilterComponent } from './books-filter/books-filter.component';
import { AddEditAuthorComponent } from './add-edit-author/add-edit-author.component';
import { AuthorsAllComponent } from './authors-all/authors-all.component';
import { EffectsModule } from '@ngrx/effects';
import { GenreEffects } from './store/effect/genre.effects';
import { genreReducer } from './store/reducer/genre.reducer';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    BooksAllComponent,
    AddEditBookComponent,
    GenresAllComponent,
    AddEditGenreComponent,
    AddIsbnComponent,
    BooksFilterComponent,
    AddEditAuthorComponent,
    AuthorsAllComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BookRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CdsModule,
    ClarityModule,
    ClrIconModule,
    StoreModule.forRoot({ genres: genreReducer}),
    EffectsModule.forRoot([GenreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

  ]
})
export class BookModule { }
