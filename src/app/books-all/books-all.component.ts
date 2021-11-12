import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { BookService } from '../service/book.service';
import '@cds/core/card/register.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-all',
  templateUrl: './books-all.component.html',
  styleUrls: ['./books-all.component.css']
})
export class BooksAllComponent implements OnInit {

  public books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        
        this.books = response;
        console.log(this.books[0].isbns)
      },
      (error: HttpErrorResponse) => {
        if(error.status === 403){
          this.router.navigate(['/login']);
        }
        

      }
    )
  }

  ngOnInit(): void {
    this.getBooks();
  }

}
