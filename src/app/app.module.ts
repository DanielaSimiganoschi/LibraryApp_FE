import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { HeaderComponent } from './header/header.component';
import { BooksAllComponent } from './books-all/books-all.component';
import { CdsModule } from '@cds/angular';
import { AuthInterceptorProvider } from './auth.interceptor';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';

import '@cds/core/alert/register.js';
import { AddEditPatronComponent } from './add-edit-patron/add-edit-patron.component';
import { PatronsAllComponent } from './patrons-all/patrons-all.component';
import { GenresAllComponent } from './genres-all/genres-all.component';
import { AddEditGenreComponent } from './add-edit-genre/add-edit-genre.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    HeaderComponent,
    BooksAllComponent,
    AddEditBookComponent,
    AddEditPatronComponent,
    PatronsAllComponent,
    GenresAllComponent,
    AddEditGenreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ClrIconModule,
    CdsModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
