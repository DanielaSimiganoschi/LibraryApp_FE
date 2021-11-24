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
import { BookBorrowedService } from '../../service/book-borrowed.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  public book: Book = {} as Book;
  public genres: any[] = [];
  public authors: Author[] = [];
  public isbns: ISBN[] = [];
  public idBook: number = -1;
  public isAddMode: boolean = false;
  public submitted: boolean = false;
  public isbnsA: ISBN[] = [] as ISBN[];

  constructor(private formBuilder: FormBuilder, private genreService: GenreService, private bookService: BookService, private authorService: AuthorService, private route: ActivatedRoute,
    private router: Router) { }


  public form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    publishedDate: ['', Validators.required],
    author: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    isbns: this.formBuilder.array([]),
    genres: [''],
  });


  public getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {

      }
    )
  }

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

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response;
        this.form.get("authors")?.setValue(response[1]);

      },
      (error: HttpErrorResponse) => {

      }
    )
  }
  public compareAuthors(item1: Author, item2: Author): boolean {
    console.log(item1.id);
    return item1.id === item2.id;
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {

    this.idBook = this.route.snapshot.params['id'];
    this.isAddMode = !this.idBook;

    this.getGenres();
    this.getAuthors();

    if (!this.isAddMode) {
      this.bookService.getBookById(this.idBook)
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


    this.form.get("quantity")?.valueChanges.subscribe((quantity) => {

      for (let i = 0; i < quantity; i++) {
        this.addISBN();
      }
      this.form.updateValueAndValidity();
      console.log(this.ISBNS.controls)

    });
  }


  onGenreSwitch(event: any, index: number) {
    this.genres[index].checked = event.target.checked;
  }

  onAuthorChange(event?: any) {
    this.book.author = this.authors[event.target.options.selectedIndex];
  }

  isISBNEmpty(index: number): boolean {
    return this.form.get("isbns")?.value[index].isbn.length == 0;
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


  public onSubmit() {
    console.log(this.form)
    this.submitted = true;

    if (this.form.invalid) {
      console.log(this.findInvalidControls());
      return;
    } else {

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

    this.bookService.addBook(this.book).subscribe(
      (response: any) => {
        console.log(this.book);
      },
      (error: HttpErrorResponse) => {
        console.log(this.book);
        console.log(error.message);
      }
    )
  }

  public onUpdateBook(): void {

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


    console.log(this.book);
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

