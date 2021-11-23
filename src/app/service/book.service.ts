import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book.model';
import { ISBN } from '../model/isbn.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiServerURL = environment.apiBaseURL;

  constructor(private http:HttpClient) { }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerURL}/books/all`);
  }


  public getBookById(bookId:number): Observable<Book>{
    return this.http.get<Book>(`${this.apiServerURL}/books/find/${bookId}`);
  }

  public getBookByTitle(bookTitle:string): Observable<Book>{
    return this.http.get<Book>(`${this.apiServerURL}/books/findByTitle/${bookTitle}`);
  }

  public addBook(book:Book): Observable<Book>{
    return this.http.post<Book>(`${this.apiServerURL}/books/add`, book);
  }

  public updateBook(book:Book): Observable<Book>{
    return this.http.put<Book>(`${this.apiServerURL}/books/update`,book);
  }

  public deleteBook(bookId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/books/delete/${bookId}`);
  }

  public filterByGenre(genreId:number): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerURL}/books/filterByGenre/${genreId}`);
  }

  public filterByAuthor(authorId:number): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerURL}/books/filterByAuthor/${authorId}`);
  }


  public getISBNSforBookId(bookId:number): Observable<ISBN[]>{
    return this.http.get<ISBN[]>(`${this.apiServerURL}/books/getISBNSForBookID/${bookId}`);
  }
}
