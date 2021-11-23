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
  {path:'',component:BooksAllComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
