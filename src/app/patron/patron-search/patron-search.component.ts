import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/base/base.component';
import { Patron } from 'src/app/model/patron.model';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-patron-search',
  templateUrl: './patron-search.component.html',
  styleUrls: ['./patron-search.component.css']
})
export class PatronSearchComponent extends BaseComponent {


  public patrons: Patron[] = [];
  public resultsVisible: boolean = false;
  public idToBeDeleted: number = -1;
  public isModalVisible: boolean = false;
  public submitted: boolean = false;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private patronService: PatronService) {
    super();
  }

  public form = this.formBuilder.group({
    firstName: [''],
    lastName: ['']
  });

  public showResults() {
    this.patronService.searchByName(this.form.get("firstName")?.value, this.form.get("lastName")?.value)
      .pipe(
        catchError(error => {
          return throwError(error.message)
        }),
        takeUntil(this.destroy$))
      .subscribe(
        (response: Patron[]) => {
          this.patrons = response;
          this.form.reset({ firstName: [''], lastName: [''] });
        }
      )
  }

}
