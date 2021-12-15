import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersAllComponent } from './users-all/users-all.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdsModule } from '@cds/angular';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserFilterComponent } from './user-filter/user-filter.component';

@NgModule({
  declarations: [
    UsersAllComponent,
    UserAuthComponent,
    UserCreateComponent,
    UserFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CdsModule,
    ClarityModule,
    ClrIconModule
  ]
})
export class UserModule { }
