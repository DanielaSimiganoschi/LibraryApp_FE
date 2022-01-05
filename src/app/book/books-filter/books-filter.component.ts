import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, throwError, zip } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
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
export class BooksFilterComponent extends BaseComponent implements OnInit {

  public books: Book[] = [];
  public booksFiltered: Book[] = [];
  public genres: Genre[] = [];
  public authors: Author[] = [];
  public resultsVisible: boolean = false;
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public submitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private genreService: GenreService, private bookService: BookService, private authorService: AuthorService, private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public form = this.formBuilder.group({
    author: [''],
    genre: [''],
    title: ['']
  });

  ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
  }

  public getGenres(): void {
    this.genreService.getGenres()
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Genre[]) => {
          this.genres = response;
        })
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
        })
  }

  public deleteBook(id: number): void {
    this.idToBeDeleted = id;
  }

  public changeModalVisible() {
    this.isModalVisible = true;
  }

  public confirm() {
    this.bookService.deleteBook(this.idToBeDeleted)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();
  }

public redirectToAddISBN(bookId: number){
  this.router.navigate([`books/addIsbnsForBook/${bookId}`]);
}

  public showResults() {
    this.bookService.filter(this.form.get("genre")?.value.id, this.form.get("author")?.value.id,
      this.form.get("title")?.value)
      .pipe(
        catchError(error => {
          return throwError(error.message)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Book[]) => {
          this.books = response;
          this.form.reset({ genre: [''], author: [''], title: [''] });
        }
      )

  }

}


