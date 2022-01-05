import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { AppUserService } from 'src/app/service/app-user.service';
import { Patron } from '../../model/patron.model';
import { PatronService } from '../../service/patron.service';

@Component({
  selector: 'app-patrons-all',
  templateUrl: './patrons-all.component.html',
  styleUrls: ['./patrons-all.component.css']
})
export class PatronsAllComponent extends BaseComponent implements OnInit {

  public patrons: Patron[] = [];
  private status: boolean = false;


  constructor(private patronService: PatronService, private router: Router, private appUser: AppUserService, private _cdr: ChangeDetectorRef) {
    super();
  }

  public isManager: boolean = this.appUser.hasManagerRights();

  changeStatus(): void {
    this.status = true;
    this._cdr.detectChanges()
  }

  ngOnInit(): void {
    this.changeStatus();
    this.getPatrons();
  }

  public getPatrons(): void {
    this.patronService.getPatrons()
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Patron[]) => {
          this.patrons = response;
        }
      )
  }

}
