import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatronRoutingModule } from './patron-routing.module';
import { AddEditPatronComponent } from './add-edit-patron/add-edit-patron.component';
import { PatronsAllComponent } from './patrons-all/patrons-all.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CdsModule } from '@cds/angular';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { AddEditBookBorrowedComponent } from './add-edit-book-borrowed/add-edit-book-borrowed.component';
import { BookBorrowedAllComponent } from './book-borrowed-all/book-borrowed-all.component';
import { BooksBorrowedFilterComponent } from './books-borrowed-filter/books-borrowed-filter.component';
import { PatronSearchComponent } from './patron-search/patron-search.component';

@NgModule({
  declarations: [
    AddEditPatronComponent,
    PatronsAllComponent,
    AddEditBookBorrowedComponent,
    BookBorrowedAllComponent,
    BooksBorrowedFilterComponent,
    PatronSearchComponent,
  ],
  imports: [
    CommonModule,
    PatronRoutingModule,
    HttpClientModule,
    FormsModule,
    CdsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrIconModule
  ]
})
export class PatronModule { }
