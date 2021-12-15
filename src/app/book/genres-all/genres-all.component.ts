import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Genre } from '../../model/genre.model';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-genres-all',
  templateUrl: './genres-all.component.html',
  styleUrls: ['./genres-all.component.css']
})
export class GenresAllComponent extends BaseComponent implements OnInit {

  public idToBeDeleted: number = -1;
  public genres: Genre[] = [];
  public isModalVisible: boolean = false;

  constructor(private genreService: GenreService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getGenres();
  }

  public getGenres(): void {
    this.genreService.getGenres()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
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

  public deleteGenre(id: number): void {
    this.idToBeDeleted = id;
    this.isModalVisible = true;
  }


  public confirm() {
    this.genreService.deleteGenre(this.idToBeDeleted)
      .pipe(catchError(error => {
        return throwError(error)
      }),
      takeUntil(this.destroy$))
      .subscribe()
    this.router.navigate(['books']);
  }

}



