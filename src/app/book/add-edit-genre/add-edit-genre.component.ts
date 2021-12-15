import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Genre } from '../../model/genre.model';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-add-edit-genre',
  templateUrl: './add-edit-genre.component.html'
})
export class AddEditGenreComponent extends BaseComponent implements OnInit {


  public idGenre: number = -1;
  public isAddMode: boolean = false;
  public genre: Genre = {} as Genre;
  public submitted: boolean = false;

  public form = this.formBuilder.group({
    name: ['', Validators.required],

  });

  constructor(private formBuilder: FormBuilder, private router: Router, private genreService: GenreService, private route: ActivatedRoute) {
    super();
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.idGenre = this.route.snapshot.params['id'];
    this.isAddMode = !this.idGenre;

    if (!this.isAddMode) {
      this.genreService.getGenreById(this.idGenre)
        .pipe(
          catchError(error => {
            return throwError(error)
          }),
          takeUntil(this.destroy$))
        .subscribe((genre: Genre) => {
          this.genre = genre;
          this.form.patchValue(genre);
        });

    }
  }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.onAddGenre();
    } else {
      this.onUpdateGenre();
    }
  }

  public onAddGenre(): void {
    this.genre.name = this.form.get("name")?.value;
    this.genreService.addGenre(this.genre)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          this.router.navigate(['books/genres'])
        }
      )
  }

  public onUpdateGenre(): void {
    this.genre.name = this.form.get("name")?.value;


    this.genreService.updateGenre(this.genre)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();

  }

}
