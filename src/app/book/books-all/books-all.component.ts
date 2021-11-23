import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import '@cds/core/card/register.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-all',
  templateUrl: './books-all.component.html',
  styleUrls: ['./books-all.component.css']
})
export class BooksAllComponent implements OnInit {

  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) { }


  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
        console.log(this.books[0].isbns)
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
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
    )
    location.reload();
  }



}
