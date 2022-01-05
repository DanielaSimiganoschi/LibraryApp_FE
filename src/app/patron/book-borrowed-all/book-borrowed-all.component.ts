import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { BookBorrowed } from 'src/app/model/book-borrowed.model';
import { Patron } from 'src/app/model/patron.model';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';
import { PatronService } from '../../service/patron.service';


@Component({
  selector: 'app-book-borrowed-all',
  templateUrl: './book-borrowed-all.component.html',
  styleUrls: ['./book-borrowed-all.component.css']
})
export class BookBorrowedAllComponent extends BaseComponent implements OnInit {

  public idPatron: number = -1;
  public isAddMode: boolean = false;
  public patron: Patron = {} as Patron;
  public bookBorrowed: any;

  public booksBorrowed: BookBorrowed[] = [];
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public idToBeReturned: number = -1;
  public isModalVisibleR: boolean = false;

  constructor(private patronService: PatronService, private bookBorrowedService: BookBorrowedService, private router: Router, private route: ActivatedRoute) {
    super();
  }


  ngOnInit(): void {
    this.idPatron = this.route.snapshot.params['id'];
    this.isAddMode = !this.idPatron;
    this.getBooksBorrowed(this.idPatron);
  }

  public getPatronNrBooksAllowed() {
    this.patronService.getPatron(this.idPatron)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Patron) => {
          this.patron = response;

        })
  }

  public checkButton(): boolean {
    if (this.patron.nrBooksAllowed == 0) {
      return true;
    }
    return false;
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

        })
  }

  public returnBook(id: number): void {
    this.idToBeReturned = id;
    this.isModalVisibleR = true;
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
