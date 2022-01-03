import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { deleteGenre, getGenres } from '../store/action/genre.actions';
import { GenreState } from '../store/reducer/genre.reducer';
import { genreSelector } from '../store/selector/genre.selectors';

@Component({
  selector: 'app-genres-all',
  templateUrl: './genres-all.component.html',
  styleUrls: ['./genres-all.component.css']
})
export class GenresAllComponent extends BaseComponent implements OnInit {

  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public genres$ = this.store.pipe(select(genreSelector));


  constructor( private router: Router, private store: Store<GenreState>) {
    super();
  }

  ngOnInit(): void {
   this.getGenres();
   
  }
  

  public getGenres(): void {
    this.store.dispatch(getGenres());
  }

  public deleteGenre(id: number): void {
    this.idToBeDeleted = id;
    this.isModalVisible = true;
  }


  public confirm() {
  this.store.dispatch(deleteGenre(this.idToBeDeleted));
   }

}






