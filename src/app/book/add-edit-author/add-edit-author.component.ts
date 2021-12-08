import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Author } from 'src/app/model/author.model';
import { Genre } from 'src/app/model/genre.model';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-add-edit-author',
  templateUrl: './add-edit-author.component.html',
  styleUrls: ['./add-edit-author.component.css']
})
export class AddEditAuthorComponent extends BaseComponent implements OnInit {

  public idAuthor: number = -1;
  public isAddMode: boolean = false;
  public author: Author = {} as Author;
  public submitted: boolean = false;

  public form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private authorService: AuthorService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.idAuthor = this.route.snapshot.params['id'];
    this.isAddMode = !this.idAuthor;

    if (!this.isAddMode) {
      this.authorService.getAuthor(this.idAuthor)
        .pipe(
          catchError(error => {
            return throwError(error)
          }),
          takeUntil(this.destroy$))
        .subscribe((author: Author) => {
          this.author = author;
          this.form.patchValue(author);
        });

    }
  }

  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.onAddAuthor();
    } else {
      this.onUpdateAuthor();
    }
  }

  public onAddAuthor(): void {
    this.author = this.form.value;
    this.authorService.addAuthor(this.author)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();

    this.router.navigate(['books/authors'])
  }

  public onUpdateAuthor(): void {
    this.author.firstName = this.form.get("firstName")?.value;
    this.author.lastName = this.form.get("lastName")?.value;
    this.author.id = this.idAuthor;

    this.authorService.updateAuthor(this.author)
      .pipe(catchError(error => {
        return throwError(error)
      }),
        takeUntil(this.destroy$))
      .subscribe();

    this.router.navigate(['books/authors'])
  }

}
