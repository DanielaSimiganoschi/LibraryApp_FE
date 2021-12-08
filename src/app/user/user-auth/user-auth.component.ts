import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/model/role.model';
import { BaseComponent } from '../../base/base.component';

import { AppUser } from '../../model/app-user.model';
import { AppUserService } from '../../service/app-user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent extends BaseComponent implements OnInit {

  public form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });


  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'access_token';
  private readonly REFRESH_TOKEN_NAME = 'refresh_token';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem('access_token');
  }

  public appUsers: AppUser[] = [];
  public roles: any[] = [];

  constructor(private userService: AppUserService, private formBuilder: FormBuilder, private router: Router,
    private jwtHelper: JwtHelperService) {
    super();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          this.appUsers = response;
        });
  }

  public onLoginUser(): void {
    this.userService.login(this.form.get("username")?.value, this.form.get("password")?.value)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {

          this._isLoggedIn$.next(true);

          localStorage.setItem('user', response);
          localStorage.setItem(this.TOKEN_NAME, response[this.TOKEN_NAME]);
          localStorage.setItem(this.REFRESH_TOKEN_NAME, response[this.REFRESH_TOKEN_NAME]);
          const decodedUser = this.jwtHelper.decodeToken(response[this.TOKEN_NAME]);
          localStorage.setItem('expiration', decodedUser.exp);
          this.userService.logOutIfTokenExpired();
          this.router.navigate(['books']);
        })
  }

  ngOnInit(): void {
  }

}
