import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookBorrowedComponent } from './add-edit-book-borrowed/add-edit-book-borrowed.component';
import { AddEditPatronComponent } from './add-edit-patron/add-edit-patron.component';
import { BookBorrowedAllComponent } from './book-borrowed-all/book-borrowed-all.component';
import { PatronsAllComponent } from './patrons-all/patrons-all.component';
import { 
  AuthGuardService as AuthGuard 
} from '../service/auth-guard.service';

const routes: Routes = [
 
  {path:'',component:PatronsAllComponent, canActivate:[AuthGuard]},
  { path: 'addPatron', component:AddEditPatronComponent , canActivate:[AuthGuard]},
  { path: 'editPatron/:id', component:AddEditPatronComponent , canActivate:[AuthGuard]},
  { path: 'manageBooksBorrowed/:id', component:BookBorrowedAllComponent , canActivate:[AuthGuard]},
  { path: 'manageBooksBorrowed/:idPatron/addBookBorrowed', component:AddEditBookBorrowedComponent , canActivate:[AuthGuard]},
  { path: 'manageBooksBorrowed/:idPatron/editBookBorrowed/:idBookBorrowed', component:AddEditBookBorrowedComponent , canActivate:[AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatronRoutingModule { }
