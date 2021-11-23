import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { BookBorrowed } from '../model/book-borrowed.model';
import { Patron } from '../model/patron.model';

@Injectable({
  providedIn: 'root'
})
export class PatronService {

  apiServerURL = environment.apiBaseURL;

  constructor(private http:HttpClient) { }

  public getPatrons(): Observable<Patron[]>{
    return this.http.get<Patron[]>(`${this.apiServerURL}/patrons/all`);
  }

  public getPatron(authorId:number): Observable<Patron>{
    return this.http.get<Patron>(`${this.apiServerURL}/patrons/find/${authorId}`);
  }

  public addPatron(patron:Patron): Observable<Patron>{
    return this.http.post<Patron>(`${this.apiServerURL}/patrons/add`, patron);
  }

  public updatePatron(patron:Patron): Observable<Patron>{
    return this.http.put<Patron>(`${this.apiServerURL}/patrons/update`,patron);
  }

  public deletePatron(patronId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/patrons/delete/${patronId}`);
  }

  public findBooksBorrowed(id:number): Observable<BookBorrowed[]>{
    return this.http.get<BookBorrowed[]>(`${this.apiServerURL}/patrons/findBooksBorrowed/${id}`);
  }

  public addBookBorrowed(id:number, bookBorrowed:BookBorrowed): Observable<BookBorrowed>{
    return this.http.post<BookBorrowed>(`${this.apiServerURL}/patrons/addBookBorrowed/${id}`,bookBorrowed);
  }


  public findBooksReturnedOnTime(id:number): Observable<BookBorrowed[]>{
    return this.http.get<BookBorrowed[]>(`${this.apiServerURL}/patrons/findBooksReturnedOnTime/${id}`);
  }

  public findBooksNotReturned(id:number): Observable<BookBorrowed[]>{
    return this.http.get<BookBorrowed[]>(`${this.apiServerURL}/patrons/findBooksNotReturned/${id}`);
  }

}
