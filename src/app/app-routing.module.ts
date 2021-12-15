import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user/user-auth/user-auth.component';
import {
  AuthGuardService as AuthGuard
} from './service/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { AdminRoleGuard } from './service/admin-role-guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [

  { path: 'login', component: UserAuthComponent },
  { path: 'logout', component: UserAuthComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: '', component: HeaderComponent, canActivate: [AuthGuard], children: [{
      path: "books",
      loadChildren: () => import('./book/book.module').then(m => m.BookModule),

    },
    {
      path: "patrons",
      loadChildren: () => import('./patron/patron.module').then(m => m.PatronModule)
    },

    {
      path: "users", canActivate: [AdminRoleGuard],
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },

    { path: '', redirectTo: 'books', pathMatch: "full" }]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
