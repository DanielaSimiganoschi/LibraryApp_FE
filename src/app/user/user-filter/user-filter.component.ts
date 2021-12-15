import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { AppUser } from 'src/app/model/app-user.model';
import { Author } from 'src/app/model/author.model';
import { Book } from 'src/app/model/book.model';
import { Genre } from 'src/app/model/genre.model';
import { Role } from 'src/app/model/role.model';
import { AppUserService } from 'src/app/service/app-user.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent extends BaseComponent implements OnInit {


  public users: AppUser[] = [];
  public roles: Role[] = [];

  public resultsVisible: boolean = false;
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public submitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private appUserService: AppUserService,
    private router: Router) {
    super();
  }

  public form = this.formBuilder.group({
    roles: [''],
  });

  ngOnInit(): void {
    this.getRoles();

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
        })
  }


  public deleteUser(id: number): void {
    this.idToBeDeleted = id;
  }

  public changeModalVisible() {
    this.isModalVisible = true;
  }

  public confirm() {
    this.appUserService.deleteUser(this.idToBeDeleted)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();
  }

  public showResults() {
    this.appUserService.filter(this.form.get("roles")?.value.id)
      .pipe(
        catchError(error => {
          return throwError(error.message)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: AppUser[]) => {
          this.users = response;
          this.form.reset({ roles: [''] });
        }
      )

  }

}
