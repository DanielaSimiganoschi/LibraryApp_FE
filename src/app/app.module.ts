import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CdsModule } from '@cds/angular';
import { AuthInterceptorProvider } from './auth.interceptor';
import {
  AuthGuardService as AuthGuard
} from './service/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import '@cds/core/alert/register.js';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BaseComponent } from './base/base.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BaseComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClrIconModule,
    CdsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthInterceptorProvider, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, { provide: LocationStrategy, useClass: HashLocationStrategy },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
