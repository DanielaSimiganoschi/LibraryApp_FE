import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { BookBorrowed } from '../model/book-borrowed.model';

@Injectable({
  providedIn: 'root'
})
export class BookBorrowedService {

  private apiServerURL = environment.apiBaseURL;

  constructor(private http: HttpClient) { }

  public getBooksBorrowed(): Observable<BookBorrowed[]> {
    return this.http.get<BookBorrowed[]>(`${this.apiServerURL}/booksBorrowed/all`);
  }

  public getBookBorrowed(bookBorrowedId: number): Observable<BookBorrowed> {
    return this.http.get<BookBorrowed>(`${this.apiServerURL}/booksBorrowed/find/${bookBorrowedId}`);
  }

  public updateBookBorrowed(bookBorrowed: BookBorrowed): Observable<BookBorrowed> {
    return this.http.put<BookBorrowed>(`${this.apiServerURL}/booksBorrowed/update`, bookBorrowed);
  }

  public deleteBookBorrowed(bookBorrowedId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/booksBorrowed/delete/${bookBorrowedId}`);
  }
}
