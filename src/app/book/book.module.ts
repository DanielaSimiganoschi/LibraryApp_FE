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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdsModule } from '@cds/angular';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { AddIsbnComponent } from './add-isbn/add-isbn.component';


@NgModule({
  declarations: [
    BooksAllComponent,
    AddEditBookComponent,
    GenresAllComponent,
    AddEditGenreComponent,
    AddIsbnComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BookRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdsModule,
    ClarityModule,
    ClrIconModule

  ]
})
export class BookModule { }
