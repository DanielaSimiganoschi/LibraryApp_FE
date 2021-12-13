import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Book } from 'src/app/model/book.model';
import { ISBN } from 'src/app/model/isbn.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-isbn',
  templateUrl: './add-isbn.component.html',
  styleUrls: ['./add-isbn.component.css']
})
export class AddIsbnComponent extends BaseComponent implements OnInit {

  public submitted: boolean = false;
  public book: Book = {} as Book;
  public idBook: number = -1;
  public isISBNUnique: boolean = false;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public form = this.formBuilder.group({
    quantity: ['', [Validators.required]],
    isbns: this.formBuilder.array([]),
    genres: [''],
  });


  get isbnGroupsArray(): FormGroup[] {
    return this.ISBNS.controls as FormGroup[];
  }

  get ISBNS() {
    return this.form.controls["isbns"] as FormArray;
  }

  addISBN(): void {
    const isbnForm = this.formBuilder.group({
      isbn: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    })
    this.ISBNS.push(isbnForm);
  }

  get f() { return this.form.controls; }


  ngOnInit(): void {

    this.idBook = this.route.snapshot.params['id'];

    this.bookService.getBookById(this.idBook)
      .subscribe((x: Book) => {
        this.book = x;
      });

    this.form.get("quantity")?.valueChanges
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe((quantity) => {
        for (let i = 0; i < quantity; i++) {
          this.addISBN();
        }

      });
  }

  checkISBN(event?: any) {
    this.bookService.getISBNForISBNCode(event.target.value)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: ISBN) => {
          if (response == null) {
            this.isISBNUnique = false;
          } else {
            this.isISBNUnique = true;
          }

        });
  }


  public onSubmit() {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.onUpdateBook();
  }

  public onUpdateBook(): void {

    this.book.isbns.push(...this.form.get("isbns")?.value)

    this.bookService.updateBook(this.book)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();
    this.router.navigate(['books'])
  }


}
