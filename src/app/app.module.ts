import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { HeaderComponent } from './header/header.component';
import { BooksAllComponent } from './books-all/books-all.component';
import { CdsModule } from '@cds/angular';
import { AuthInterceptor, AuthInterceptorProvider } from './auth.interceptor';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';



@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    HeaderComponent,
    BooksAllComponent,
    AddEditBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ClrIconModule,
    CdsModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
