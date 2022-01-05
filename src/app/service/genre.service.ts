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

  constructor(private http: HttpClient) { }

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiServerURL}/genre/all`);
  }

  public getGenreById(genreId: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiServerURL}/genre/find/${genreId}`);
  }

  public addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.apiServerURL}/genre/add`, genre);
  }

  public updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiServerURL}/genre/update`, genre);
  }

  public deleteGenre(genreId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerURL}/genre/delete/${genreId}`);
  }
}
