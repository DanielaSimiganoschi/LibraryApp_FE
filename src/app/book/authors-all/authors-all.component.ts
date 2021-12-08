import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Author } from 'src/app/model/author.model';
import { Genre } from 'src/app/model/genre.model';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-authors-all',
  templateUrl: './authors-all.component.html',
  styleUrls: ['./authors-all.component.css']
})
export class AuthorsAllComponent extends BaseComponent implements OnInit {


  public idToBeDeleted: number = -1;
  public authors: Author[] = [];
  public isModalVisible: boolean = false;

  constructor(private authorService: AuthorService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  public getAuthors(): void {
    this.authorService.getAuthors()
      .pipe(
        catchError(error => {
          return throwError(error)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Author[]) => {
          this.authors = response;
        });
  }

  public deleteAuthor(id: number): void {
    this.idToBeDeleted = id;
  }

  public changeModalVisible() {
    this.isModalVisible = true;
  }

  public confirm() {
    this.authorService.deleteAuthor(this.idToBeDeleted)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe()
    this.router.navigate(['books']);
  }
}
