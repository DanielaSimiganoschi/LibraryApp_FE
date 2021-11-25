import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/model/author.model';
import { Book } from 'src/app/model/book.model';
import { Genre } from 'src/app/model/genre.model';
import { AuthorService } from 'src/app/service/author.service';
import { BookService } from 'src/app/service/book.service';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-books-filter',
  templateUrl: './books-filter.component.html',
  styleUrls: ['./books-filter.component.css']
})
export class BooksFilterComponent implements OnInit {


  public books: Book[] = [];
  public genres: Genre[] = [];
  public authors: Author[] = [];
  public booksAuthorFiltered: Book[] = [];
  public booksGenreFiltered: Book[] = [];
  public resultsVisible: boolean = false;
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private genreService: GenreService, private bookService: BookService, private authorService: AuthorService, private route: ActivatedRoute,
    private router: Router) { }

  public form = this.formBuilder.group({
    author: [''],
    genre: [''],
  });

  ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
  }

  public getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {

      }
    )
  }

  public getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response;
      },
      (error: HttpErrorResponse) => {

      }
    )
  }

  public deleteBook(id: number): void {

    this.idToBeDeleted = id;

  }

  public changeModalVisible() {
    this.isModalVisible = true;
  }

  public confirm() {
    console.log(this.idToBeDeleted);
    this.bookService.deleteBook(this.idToBeDeleted).subscribe(
      (response: any) => {

      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }


  public showResults() {

    this.resultsVisible = true;

    if (this.form.get("author")?.value.id) {
      this.bookService.filterByAuthor(this.form.get("author")?.value.id).subscribe(
        (response: Book[]) => {
          this.booksAuthorFiltered = response;
        },
        (error: HttpErrorResponse) => {
        }
      )
    }

    if (this.form.get("genre")?.value.id) {
      this.bookService.filterByAuthor(this.form.get("genre")?.value.id).subscribe(
        (response: Book[]) => {
          this.booksGenreFiltered = response;
        },
        (error: HttpErrorResponse) => {
        }
      )
    }

    if (this.form.get("author")?.value.id && this.form.get("genre")?.value.id) {
      this.books = this.booksGenreFiltered.filter(value => this.booksAuthorFiltered.includes(value));
    } else if (this.form.get("author")?.value.id) {
      this.books = this.booksAuthorFiltered;
    } else if (this.form.get("genre")?.value.id) {
      this.books = this.booksGenreFiltered;
    } else {
      this.bookService.getBooks().subscribe(
        (response: Book[]) => {
          this.books = response;
        },
        (error: HttpErrorResponse) => {
        }
      )
    }
  }

}
