import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import '@cds/core/card/register.js';
import { Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-books-all',
  templateUrl: './books-all.component.html',
  styleUrls: ['./books-all.component.css']
})
export class BooksAllComponent extends BaseComponent implements OnInit {

  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {
    super();
  }


  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks()
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Book[]) => {
          this.books = response;
        });
  }

  public deleteBook(id: number): void {
    this.idToBeDeleted = id;
  }

  public changeModalVisible() {
    this.isModalVisible = true;
  }

  public confirm() {
    this.bookService.deleteBook(this.idToBeDeleted)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe();

  }

}
