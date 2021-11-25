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
import { CdsModule } from '@cds/angular';
import { AuthInterceptorProvider } from './auth.interceptor';
import {
  AuthGuardService as AuthGuard
} from './service/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import '@cds/core/alert/register.js';
import { RouterModule } from '@angular/router';
import { PatronModule } from './patron/patron.module';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    HeaderComponent,
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
    CdsModule,
  ],
  providers: [AuthInterceptorProvider, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
