import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/base/base.component';
import { Genre } from '../../model/genre.model';
import { GenreService } from '../../service/genre.service';
import { addGenre, updateGenre } from '../store/action/genre.actions';
import { GenreState } from '../store/reducer/genre.reducer';
import { genreByIdSelector } from '../store/selector/genre.selectors';

@Component({
  selector: 'app-add-edit-genre',
  templateUrl: './add-edit-genre.component.html'
})
export class AddEditGenreComponent extends BaseComponent implements OnInit {


  public idGenre: number = -1;
  public isAddMode: boolean = false;
  public genreToBeUpdated: Genre = {} as Genre;
  
  public submitted: boolean = false;

  public form = this.formBuilder.group({
    name: ['', Validators.required],

  });
  public genre: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private genreService: GenreService, private route: ActivatedRoute,
    private store: Store<GenreState>) {
    super();
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.idGenre = this.route.snapshot.params['id'];
    this.isAddMode = !this.idGenre;

    if (!this.isAddMode) {
     this.genre = this.store.pipe(select(genreByIdSelector(this.idGenre))).subscribe(
      (genre) => {
      
      console.log(genre) 
      });
     this.form.patchValue(this.genre);
 
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
    this.store.dispatch(addGenre(this.genre));
    this.router.navigate(['books/genres'])
  }

  public onUpdateGenre(): void {
    this.genre.name = this.form.get("name")?.value;
    this.store.dispatch(updateGenre(this.genre));
    this.router.navigate(['books/genres'])

  }

}
