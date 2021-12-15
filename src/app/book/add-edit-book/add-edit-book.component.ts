import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Author } from '../../model/author.model';
import { Book } from '../../model/book.model';
import { Genre } from '../../model/genre.model';
import { ISBN } from '../../model/isbn.model';
import { AuthorService } from '../../service/author.service';
import { BookService } from '../../service/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenreService } from '../../service/genre.service';
import { BaseComponent } from 'src/app/base/base.component';
import { catchError, takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html'
})
export class AddEditBookComponent extends BaseComponent implements OnInit {

  public book: Book = {} as Book;
  public genres: any[] = [];
  public authors: Author[] = [];
  public isbns: ISBN[] = [];
  public idBook: number = -1;
  public isAddMode: boolean = false;
  public submitted: boolean = false;
  public isbnsA: ISBN[] = [] as ISBN[];
  public isNotUnique: boolean = false;

  constructor(private formBuilder: FormBuilder, private genreService: GenreService, private bookService: BookService, private authorService: AuthorService, private route: ActivatedRoute,
    private router: Router) {
    super();
  }


  public form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    publishedDate: ['', Validators.required],
    author: ['', [Validators.required]],
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

  checkISBN(event?: any) {
    this.bookService.getISBNForISBNCode(event.target.value)
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: ISBN) => {
          if (response == null) {
            this.isNotUnique = false;
          } else {
            this.isNotUnique = true;
          }

        })
  }


  addISBN(): void {
    const isbnForm = this.formBuilder.group({
      isbn: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    })
    this.ISBNS.push(isbnForm);
  }

  isISBNEmpty(index: number): boolean {
    return this.form.get("isbns")?.value[index].isbn.length == 0;
  }

  public getAuthors(): void {
    this.authorService.getAuthors()
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Author[]) => {
          this.authors = response;
          this.form.get("authors")?.setValue(response[1]);

        })
  }

  public compareAuthors(item1: Author, item2: Author): boolean {
    return item1.id === item2.id;
  }

  onAuthorChange(event?: any) {
    this.book.author = this.authors[event.target.options.selectedIndex];
  }

  public getGenres(): void {
    this.genreService.getGenres().pipe(
      catchError(error => {
        return throwError(error)
      }),
      takeUntil(this.destroy$)).subscribe(
        (response: Genre[]) => {
          this.genres = response;
        });
  }

  onGenreSwitch(event: any, index: number) {
    this.genres[index].checked = event.target.checked;
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {

    this.idBook = this.route.snapshot.params['id'];
    this.isAddMode = !this.idBook;

    this.getGenres();
    this.getAuthors();

    if (!this.isAddMode) {
      this.bookService.getBookById(this.idBook)
        .pipe(takeUntil(this.destroy$))
        .subscribe((x: Book) => {
          this.book = x;
          this.genres = this.genres.map((genre) => {
            return {
              id: genre.id,
              name: genre.name,
              checked: x.genres.filter(e => e.name === genre.name).length > 0
            }
          }
          )
          this.book.genres = this.genres;

          this.form.patchValue(x);
        });
    }


    this.form.get("quantity")?.valueChanges
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))

      .subscribe((quantity) => {

        for (let i = 0; i < quantity; i++) {
          this.addISBN();
        }
        this.form.updateValueAndValidity();

      });
  }


  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.onAddBook();
    } else {
      this.onUpdateBook();
    }
  }

  public onAddBook(): void {

    this.book.title = this.form.get("title")?.value;
    this.book.description = this.form.get("description")?.value;
    this.book.isbns = this.form.get("isbns")?.value;
    this.book.quantity = this.form.get("quantity")?.value;
    this.book.publishedDate = this.form.get("publishedDate")?.value;

    let genresSelected: Genre[] = [];

    this.genres.forEach((element: any, index: number) => {
      let genre: Genre = {} as Genre;
      if (element.checked === true) {
        genre.id = element.id;
        genre.name = element.name;
        genresSelected.push(genre);
      };
    });
    this.book.genres = genresSelected;

    this.bookService.addBook(this.book)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();

    this.router.navigate(['books'])
  }

  public onUpdateBook(): void {

    this.book = this.form.value;
    this.book.id = this.idBook;
    let genresSelected: Genre[] = [];

    this.genres.forEach((element: any, index: number) => {
      let genre: Genre = {} as Genre;
      if (element.checked === true) {
        genre.id = element.id;
        genre.name = element.name;
        genresSelected.push(genre);
      };
    });
    this.book.genres = genresSelected;



    this.bookService.updateBook(this.book)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()

    this.router.navigate(['books'])
  }
}

