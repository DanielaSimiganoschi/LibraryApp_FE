import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../model/book.model';
import { Genre } from '../model/genre.model';
import { ISBN } from '../model/isbn.model';
import { BookService } from '../service/book.service';
import { GenreService } from '../service/genre.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  constructor(private genreService: GenreService, private bookService: BookService) { }


  public genres: Genre[] = [];
  public genresSelected: string[] = [];
  public items: number[] = [];
  public isbnData: string[] = [];

  createRange(event: any) {
    for (var i = 1; i <= event?.target.value; i++) {
      this.items.push(i);
    }
  }

  getRange() {
    return this.items;
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


  ngOnInit(): void {
    this.getGenres();
  }

  public onAddBook(addForm: NgForm): void {

    let book: Book = {} as Book;
    book.isbns = [];
    book.genres = [];
    book.title = addForm.controls["title"].value;
    book.description = addForm.controls["description"].value;
    book.publishedDate = addForm.controls["publishedDate"].value;
    book.quantity = addForm.controls["quantity"].value;

    this.genresSelected.forEach( (value, i) => {
      console.log(value)
      if (value) {
        console.log(this.genres[i]);
        book.genres.push(this.genres[i])
      }
  });
  this.isbnData.forEach(isbnF => {
    let isbnNew = {} as ISBN;
    isbnNew.isbn= isbnF;

    book.isbns.push(isbnNew);
  });

    this.bookService.addBook(book).subscribe(
      (response: any) => {

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
}

