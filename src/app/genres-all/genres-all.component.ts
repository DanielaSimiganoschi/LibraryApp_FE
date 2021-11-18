import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { GenreService } from '../service/genre.service';

@Component({
  selector: 'app-genres-all',
  templateUrl: './genres-all.component.html',
  styleUrls: ['./genres-all.component.css']
})
export class GenresAllComponent implements OnInit {

  public genres: Genre[] = [];

  constructor(private genreService: GenreService, private router: Router) { }


  ngOnInit(): void {
    this.getGenres();
  }
  
  public getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
      }
    )
  }



}
