import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { AppUser } from 'src/app/model/app-user.model';
import { AppUserService } from 'src/app/service/app-user.service';

@Component({
  selector: 'app-users-all',
  templateUrl: './users-all.component.html'
})
export class UsersAllComponent extends BaseComponent implements OnInit {


  public users: AppUser[] = [];
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;

  constructor(private userService: AppUserService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.getAllUsers();

  }

  public getAllUsers(): void {
    this.userService.getUsers()
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: AppUser[]) => {
          this.users = response;
        })
  }

  public deleteUser(id: number): void {
    this.idToBeDeleted = id;
  }

  public changeModalVisible() {
    this.isModalVisible = true;
  }

  public confirm() {
    this.userService.deleteUser(this.idToBeDeleted)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe();
  }
}
