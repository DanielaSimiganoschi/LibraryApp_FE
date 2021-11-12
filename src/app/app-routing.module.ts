import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { BooksAllComponent } from './books-all/books-all.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {path:'login',component:UserAuthComponent},
  {path:'books',component:BooksAllComponent},
  {path:'addBook',component:AddEditBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
