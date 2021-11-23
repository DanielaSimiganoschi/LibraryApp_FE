import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { AddEditGenreComponent } from './add-edit-genre/add-edit-genre.component';
import { BooksAllComponent } from './books-all/books-all.component';
import { GenresAllComponent } from './genres-all/genres-all.component';
import { 
  AuthGuardService as AuthGuard 
} from '../service/auth-guard.service';



const routes: Routes = [

  {path:'',component:BooksAllComponent, canActivate:[AuthGuard] },
  {path:'genres',component:GenresAllComponent,canActivate:[AuthGuard]},
  {path:'addBook',component:AddEditBookComponent,canActivate:[AuthGuard]},
  { path: 'editBook/:id', component:AddEditBookComponent,canActivate:[AuthGuard] },
  { path: 'genres/addGenre', component:AddEditGenreComponent,canActivate:[AuthGuard] },
  { path: 'genres/editGenre/:id', component:AddEditGenreComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
