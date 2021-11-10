import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppUser } from '../model/app-user.model';
import { AppUserService } from '../service/app-user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  public appUsers: AppUser[] = [];

  constructor(private userService: AppUserService) { }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response:any) => {
        this.appUsers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onLoginUser(addForm: NgForm): void {
  
    this.userService.login(addForm.controls['usernameL'].value,addForm.controls['passwordL'].value).subscribe(
      (response: String[]) => { },
      (error: HttpErrorResponse) => {
      console.log(error.message);
      }
        );
      }
    
  

  ngOnInit(): void {
  }

}
