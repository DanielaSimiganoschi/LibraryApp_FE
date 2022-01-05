import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Patron } from '../../model/patron.model';
import { PatronService } from '../../service/patron.service';

@Component({
  selector: 'app-add-edit-patron',
  templateUrl: './add-edit-patron.component.html'
})
export class AddEditPatronComponent extends BaseComponent implements OnInit {

  public idPatron: number = -1;
  public isAddMode: boolean = false;
  public patron: Patron = {} as Patron;
  public submitted: boolean = false;

  public form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private patronService: PatronService, private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.idPatron = this.route.snapshot.params['id'];
    this.isAddMode = !this.idPatron;

    if (!this.isAddMode) {
      this.patronService.getPatron(this.idPatron)
        .pipe(catchError(error => {
          return throwError(error)
        }),
          takeUntil(this.destroy$))
        .subscribe((patron: Patron) => {
          this.patron = patron;
          this.form.patchValue(patron);
        });

    }
  }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.onAddPatron();
    } else {
      this.onUpdatePatron();
    }
  }

  public onAddPatron(): void {
    
    this.patron = this.form.value;

    this.patronService.addPatron(this.patron)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()
    this.router.navigate(['patrons'])
  }

  public onUpdatePatron(): void {

    this.patron = this.form.value;
    this.patron.id = this.idPatron;

    this.patronService.updatePatron(this.patron)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()
    this.router.navigate(['patrons'])
  }
}
