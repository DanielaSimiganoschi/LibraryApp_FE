import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-isbn',
  templateUrl: './add-isbn.component.html',
  styleUrls: ['./add-isbn.component.css']
})
export class AddIsbnComponent implements OnInit {

  public submitted: boolean = false;
  public book: Book = {} as Book;
  public idBook: number = -1;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private route: ActivatedRoute,
    private router: Router) { }

  public form = this.formBuilder.group({
    quantity: ['', [Validators.required]],
    isbns: this.formBuilder.array([]),
    genres: [''],
  });


  get isbnGroupsArray(): FormGroup[] {
    console.log(this.ISBNS.controls as FormGroup[])
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

    this.form.get("quantity")?.valueChanges.subscribe((quantity) => {

      for (let i = 0; i < quantity; i++) {
        this.addISBN();
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
    console.log(this.book)

    this.bookService.updateBook(this.book).subscribe(
      (response: any) => {
        console.log(this.book);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

}
