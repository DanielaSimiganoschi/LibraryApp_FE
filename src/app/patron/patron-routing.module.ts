import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookBorrowedComponent } from './add-edit-book-borrowed/add-edit-book-borrowed.component';
import { AddEditPatronComponent } from './add-edit-patron/add-edit-patron.component';
import { BookBorrowedAllComponent } from './book-borrowed-all/book-borrowed-all.component';
import { PatronsAllComponent } from './patrons-all/patrons-all.component';
import { BooksBorrowedFilterComponent } from './books-borrowed-filter/books-borrowed-filter.component';
import { PatronSearchComponent } from './patron-search/patron-search.component';
import { ManagerRoleGuard } from '../service/manager-role-guard';

const routes: Routes = [

  { path: '', component: PatronsAllComponent },
  { path: 'addPatron', canActivate: [ManagerRoleGuard], component: AddEditPatronComponent },
  { path: 'editPatron/:id', canActivate: [ManagerRoleGuard], component: AddEditPatronComponent },
  { path: 'manageBooksBorrowed/:id', component: BookBorrowedAllComponent },
  { path: 'manageBooksBorrowed/:idPatron/addBookBorrowed', component: AddEditBookBorrowedComponent },
  { path: 'manageBooksBorrowed/:idPatron/editBookBorrowed/:idBookBorrowed', component: AddEditBookBorrowedComponent },
  { path: 'manageBooksBorrowed/:idPatron/booksBorrowedFilter', component: BooksBorrowedFilterComponent },
  { path: 'searchPatronByName', component: PatronSearchComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatronRoutingModule { }
