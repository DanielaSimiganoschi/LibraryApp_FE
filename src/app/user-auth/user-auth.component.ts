import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { AppUser } from '../model/app-user.model';
import { AppUserService } from '../service/app-user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'access_token';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem('access_token');
  }

  public appUsers: AppUser[] = [];

  constructor(private userService: AppUserService) {
   
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.appUsers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onLoginUser(addForm: NgForm): void {
    this.userService.login(addForm.controls['usernameL'].value, addForm.controls['passwordL'].value).subscribe(
      (response: any) => {
        console.log(response['access_token']);
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response[this.TOKEN_NAME])
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }


  ngOnInit(): void {
  }

}
