import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { BookBorrowed } from 'src/app/model/book-borrowed.model';
import { Book } from 'src/app/model/book.model';
import { ISBN } from 'src/app/model/isbn.model';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';
import { BookService } from 'src/app/service/book.service';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-add-edit-book-borrowed',
  templateUrl: './add-edit-book-borrowed.component.html',
  styleUrls: ['./add-edit-book-borrowed.component.css']
})
export class AddEditBookBorrowedComponent extends BaseComponent implements OnInit {

  public books: Book[] = [];
  public book: Book = {} as Book;
  public bookBorrowed: BookBorrowed = {} as BookBorrowed;
  public isbns: ISBN[] = [];
  public isbn: string = "";
  public idBookBorrowed: number = -1;
  public idPatron: number = -1;
  public isAddMode: boolean = false;
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private bookBorrowedService: BookBorrowedService, private patronService: PatronService, private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public form = this.formBuilder.group({
    book: ['', Validators.required],
    isbn: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
  });

  get f() { return this.form.controls; }

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

  public getISBNS(event: any): void {
    this.isbns.splice(0, this.isbns.length);
    this.form.get("isbn")?.setValue("");
    this.bookService.getISBNSforBookId(this.form.get("book")?.value.id)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: ISBN[]) => {
          response.forEach(element => {
            if (element.borrowed == false) {
              this.isbns.push(element);
            }
          });
        });

  }
  public ISBNSForSelectedBook(): boolean {
    return this.isbns.length === 0;
  }

  public checkISBSLength(): boolean {
   return this.form.get("isbn")?.value.length < 10;
  }

  onISBNChange(event: any) {
    this.isbn = event.target.value;
  }

  ngOnInit(): void {
    this.idBookBorrowed = this.route.snapshot.params['idBookBorrowed'];
    this.idPatron = this.route.snapshot.params['idPatron'];
    this.isAddMode = !this.idBookBorrowed;
    this.getBooks();


    if (!this.isAddMode) {
      this.bookBorrowedService.getBookBorrowed(this.idBookBorrowed)
        .pipe(
          catchError(error => {
            return throwError(error)
          }),
          takeUntil(this.destroy$))
        .subscribe((x: BookBorrowed) => {
          this.bookBorrowed = x;
          this.form.patchValue(x);
        });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.isAddMode) {
      this.onAddBookBorrowed();
    } else {
      this.onUpdateBookBorrowed();
    }
  }

  public onAddBookBorrowed(): void {

    this.bookBorrowed.isbn = this.form.get("isbn")?.value;
    this.bookBorrowed.patron_id = this.idPatron;

    this.patronService.addBookBorrowed(this.idPatron, this.bookBorrowed)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();
  }


  public onUpdateBookBorrowed(): void {
    this.bookBorrowed.isbn = this.form.get("isbn")?.value;
    this.bookBorrowed.patron_id = this.idPatron;
    this.bookBorrowed.id = this.idBookBorrowed;

    this.bookBorrowedService.updateBookBorrowed(this.bookBorrowed)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()
  }
}
