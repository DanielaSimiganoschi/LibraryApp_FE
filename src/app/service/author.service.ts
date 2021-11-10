import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Author } from '../model/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiServerURL = environment.apiBaseURL;

  constructor(private http:HttpClient) { }

  public getAuthors(): Observable<Author[]>{
    return this.http.get<Author[]>(`${this.apiServerURL}/authors/all`);
  }

  public getAuthor(authorId:number): Observable<Author>{
    return this.http.get<Author>(`${this.apiServerURL}/author/find/${authorId}`);
  }

  public addAuthor(author:Author): Observable<Author>{
    return this.http.post<Author>(`${this.apiServerURL}/author/add`, author);
  }

  public updateAuthor(author:Author): Observable<Author>{
    return this.http.post<Author>(`${this.apiServerURL}/author/update`,author);
  }

  public deleteAuthor(authorId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/author/delete/${authorId}`);
  }

}
