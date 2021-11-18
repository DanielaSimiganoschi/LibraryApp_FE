import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AddEditGenreComponent } from './add-edit-genre/add-edit-genre.component';
import { AddEditPatronComponent } from './add-edit-patron/add-edit-patron.component';
import { BooksAllComponent } from './books-all/books-all.component';
import { GenresAllComponent } from './genres-all/genres-all.component';
import { PatronsAllComponent } from './patrons-all/patrons-all.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {path:'login',component:UserAuthComponent},
  {path:'books',component:BooksAllComponent},
  {path:'patrons',component:PatronsAllComponent},
  {path:'genres',component:GenresAllComponent},
  {path:'addBook',component:AddEditBookComponent},
  { path: 'editBook/:id', component:AddEditBookComponent },
  { path: 'addPatron', component:AddEditPatronComponent },
  { path: 'editPatron/:id', component:AddEditPatronComponent },
  { path: 'addGenre', component:AddEditGenreComponent },
  { path: 'editGenre/:id', component:AddEditGenreComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
