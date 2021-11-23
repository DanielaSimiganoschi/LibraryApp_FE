
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppUserService } from './app-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AppUserService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log(this.auth.isAuthenticated())
      this.router.navigate(['login']);
      return false;
    }
    console.log('is auth')
    return true;
  }
}