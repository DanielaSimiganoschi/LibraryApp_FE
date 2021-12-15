import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { BookBorrowed } from 'src/app/model/book-borrowed.model';
import { Patron } from 'src/app/model/patron.model';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';
import { PatronService } from 'src/app/service/patron.service';

import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-books-borrowed-filter',
  templateUrl: './books-borrowed-filter.component.html',
  styleUrls: ['./books-borrowed-filter.component.css']
})
export class BooksBorrowedFilterComponent extends BaseComponent implements OnInit {

  public idPatron: number = -1;

  public patron: Patron = {} as Patron;
  public bookBorrowed: any;

  public booksBorrowed: BookBorrowed[] = [];
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public idToBeReturned: number = -1;
  public isModalVisibleR: boolean = false;


  public form = this.formBuilder.group({
    filterBy: ['']
  });
  submitted: boolean = false;

  constructor(private patronService: PatronService, private formBuilder: FormBuilder, private bookBorrowedService: BookBorrowedService, private router: Router, private route: ActivatedRoute) {
    super();
  }


  ngOnInit(): void {
    this.idPatron = this.route.snapshot.params['idPatron'];

  }

  public getBooksReturnedOnTime() {
    this.patronService.findBooksReturnedOnTime(this.idPatron)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: BookBorrowed[]) => {
          this.booksBorrowed = response;
          this.form.reset();
        })
  }

  public getBooksNotReturned() {
    this.patronService.findBooksNotReturned(this.idPatron)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: BookBorrowed[]) => {
          this.booksBorrowed = response;
          this.form.reset();
        })
  }


  public getBooksBorrowed(id: number): void {
    this.patronService.findBooksBorrowed(id)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: BookBorrowed[]) => {
          this.booksBorrowed = response;
          this.form.reset();
        })
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.form.get("filterBy")?.value == 1) {
      this.getBooksNotReturned();
    } else if (this.form.get("filterBy")?.value == 2) {
      this.getBooksReturnedOnTime();
    } else {
      this.getBooksBorrowed(this.idPatron);
    }
  }


  public returnBook(id: number): void {
    this.isModalVisibleR = true;
    this.idToBeReturned = id;
  }


  public deleteBookBorrowed(id: number): void {
    this.isModalVisible = true;
    this.idToBeDeleted = id;

  }




  public confirm() {
    this.bookBorrowedService.deleteBookBorrowed(this.idToBeDeleted)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()
  }

  public confirmR() {
    this.bookBorrowed = this.booksBorrowed.filter(
      book => book.id === this.idToBeReturned);
    this.bookBorrowed[0].returned = true;
    this.bookBorrowedService.updateBookBorrowed(this.bookBorrowed[0])
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()
  }

}
