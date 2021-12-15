import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserFilterComponent } from './user-filter/user-filter.component';

import { UsersAllComponent } from './users-all/users-all.component';

const routes: Routes = [
  { path: '', component: UsersAllComponent },
  { path: 'addUser', component: UserCreateComponent },
  { path: 'editUser/:id', component: UserCreateComponent },
  { path: 'filterUsers', component: UserFilterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
