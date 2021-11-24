import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AddEditGenreComponent } from './add-edit-genre/add-edit-genre.component';
import { BooksAllComponent } from './books-all/books-all.component';
import { GenresAllComponent } from './genres-all/genres-all.component';
import {
  AuthGuardService as AuthGuard
} from '../service/auth-guard.service';
import { AddIsbnComponent } from './add-isbn/add-isbn.component';
import { BooksFilterComponent } from './books-filter/books-filter.component';



const routes: Routes = [

  { path: '', component: BooksAllComponent },
  { path: 'genres', component: GenresAllComponent },
  { path: 'addBook', component: AddEditBookComponent },
  { path: 'editBook/:id', component: AddEditBookComponent },
  { path: 'genres/addGenre', component: AddEditGenreComponent },
  { path: 'genres/editGenre/:id', component: AddEditGenreComponent },
  { path: 'addIsbnsForBook/:id', component: AddIsbnComponent },
  { path: 'filterBooks', component: BooksFilterComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
