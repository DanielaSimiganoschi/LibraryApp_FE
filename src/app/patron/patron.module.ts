import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatronRoutingModule } from './patron-routing.module';
import { AddEditPatronComponent } from './add-edit-patron/add-edit-patron.component';
import { PatronsAllComponent } from './patrons-all/patrons-all.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import '@cds/core/alert/register.js';
import { CdsModule } from '@cds/angular';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { AddEditBookBorrowedComponent } from './add-edit-book-borrowed/add-edit-book-borrowed.component';
import { BookBorrowedAllComponent } from './book-borrowed-all/book-borrowed-all.component';
import { BookBorrowedFilerComponent } from './book-borrowed-filter/book-borrowed-filer.component';

@NgModule({
  declarations: [
    AddEditPatronComponent,
    PatronsAllComponent,
    AddEditBookBorrowedComponent,
    BookBorrowedAllComponent,
    BookBorrowedFilerComponent,
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
