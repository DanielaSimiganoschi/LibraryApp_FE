
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUserService } from './app-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(public jwtHelper: JwtHelperService, public router: Router) { }

  canActivate(): boolean {

    const roles: String[] = this.jwtHelper.decodeToken(localStorage.getItem("access_token")?.toString())?.roles;
    if (roles.indexOf("ROLE_ADMIN") >= 0) {

      return true;
    }
    this.router.navigate(['unauthorized']);
    return false;
  }
}