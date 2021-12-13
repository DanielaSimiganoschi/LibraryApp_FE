import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { componentStringsDefault } from '@cds/core';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { RoleToUser } from 'src/app/model/role-to-user.model';
import { Role } from 'src/app/model/role.model';
import { AppUser } from '../../model/app-user.model';
import { AppUserService } from '../../service/app-user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html'
})



export class UserCreateComponent extends BaseComponent implements OnInit {

  private user: AppUser = {} as AppUser;
  private userByUsername: AppUser = {} as AppUser;
  public submitted: boolean = false;
  public isAddMode: boolean = false;
  public isNotUnique: boolean = false;
  public idUser: number = -1;
  public roles: Role[] = [];
  private role: Role = {} as Role;

  constructor(private formBuilder: FormBuilder, private appUserService: AppUserService, private route: ActivatedRoute
    , private router: Router) {
    super();
  }

  public form = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],  
    password: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    role: ['', Validators.compose([Validators.required])],
  });

  public compareRoles(item1: Role, item2: Role): boolean {
    return item1.id === item2.id;
  }

  onRoleChange(event?: any) {
    this.role = this.roles[event.target.options.selectedIndex];
  }

  ngOnInit(): void {

    this.getRoles();
    this.idUser = this.route.snapshot.params['id'];
    this.isAddMode = !this.idUser;

    if (!this.isAddMode) {
      this.appUserService.getUserById(this.idUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe((x: AppUser) => {
          this.user = x;
          this.form.patchValue(x);
        });
    }
  }

  checkUsername(event?: any) {
    this.appUserService.getUserByUsername(event.target.value)
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
        (response: AppUser) => {
          if (response == null) {
            this.isNotUnique = false;
          } else {
            this.isNotUnique = true;
          }

        },
        (error: HttpErrorResponse) => {

        }
      )
  }


  public getRoles(): void {
    this.appUserService.getRoles()
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Role[]) => {
          this.roles = response;
        }
      )
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.form.invalid || this.isNotUnique == true) {
      return;
    }

    if (this.isAddMode) {
      this.onAddUser();
    } else {
      this.onUpdateUser();
    }
  }

  public onAddUser() {

    this.appUserService.addUser(this.form.value)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()

    this.router.navigate(['users'])
  }

  public onUpdateUser() {
    this.user = this.form.value;
    this.user.id = this.idUser;

    this.appUserService.updateUser(this.user)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()

    this.router.navigate(['users'])
  }

}

