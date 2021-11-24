import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { 
  AuthGuardService as AuthGuard 
} from './service/auth-guard.service';
import { BooksAllComponent } from './book/books-all/books-all.component';

const routes: Routes = [
  
  {path:'login',component:UserAuthComponent},
  {path:'logout',component:UserAuthComponent},
  {
    path: "books",
    canActivate: [AuthGuard],
    loadChildren: () => import('./book/book.module').then(m => m.BookModule),

  },
  {
    path:"patrons",
    canActivate: [AuthGuard],
    loadChildren: () => import('./patron/patron.module').then(m => m.PatronModule)
  },

  {path:'', redirectTo:'books', pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
