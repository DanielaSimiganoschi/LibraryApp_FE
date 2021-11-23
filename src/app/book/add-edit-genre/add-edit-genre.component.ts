import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../../model/genre.model';
import { GenreService } from '../../service/genre.service';

@Component({
  selector: 'app-add-edit-genre',
  templateUrl: './add-edit-genre.component.html',
  styleUrls: ['./add-edit-genre.component.css']
})
export class AddEditGenreComponent implements OnInit {


  public idGenre: number = -1;
  public isAddMode: boolean = false;
  public genre: Genre = {} as Genre;
  public submitted: boolean = false;

  public form = this.formBuilder.group({
    name: ['', Validators.required],

  });

  constructor(private formBuilder: FormBuilder, private router: Router, private genreService: GenreService, private route: ActivatedRoute) { }
  
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.idGenre = this.route.snapshot.params['id'];
    this.isAddMode = !this.idGenre;

    if (!this.isAddMode) {
      this.genreService.getGenreById(this.idGenre)
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
    this.genreService.addGenre(this.genre).subscribe(
      (response: any) => {
        this.router.navigate(['books/genres'])
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public onUpdateGenre(): void {
    this.genre.name = this.form.get("name")?.value;


    this.genreService.updateGenre(this.genre).subscribe(
      (response: any) => {
        console.log(this.genre);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )

  }

}
