import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiServerURL = environment.apiBaseURL;

  constructor(private http:HttpClient) { }

  public getGenres(): Observable<Genre[]>{
    return this.http.get<Genre[]>(`${this.apiServerURL}/genres/all`);
  }

  public getGenreById(genreId:number): Observable<Genre>{
    return this.http.get<Genre>(`${this.apiServerURL}/genres/find/${genreId}`);
  }

  public addGenre(genre:Genre): Observable<Genre>{
    return this.http.post<Genre>(`${this.apiServerURL}/genres/add`, genre);
  }

  public updateGenre(genre:Genre): Observable<Genre>{
    return this.http.post<Genre>(`${this.apiServerURL}/genres/update`,genre);
  }

  public deleteGenre(genreId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerURL}/genres/delete/${genreId}`);
  }
}
