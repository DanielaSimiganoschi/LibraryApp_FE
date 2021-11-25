import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patron } from '../../model/patron.model';
import { PatronService } from '../../service/patron.service';

@Component({
  selector: 'app-add-edit-patron',
  templateUrl: './add-edit-patron.component.html',
  styleUrls: ['./add-edit-patron.component.css']
})
export class AddEditPatronComponent implements OnInit {

  public idPatron: number = -1;
  public isAddMode: boolean = false;
  public patron: Patron = {} as Patron;
  public submitted: boolean = false;

  public form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private patronService: PatronService, private route: ActivatedRoute) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.idPatron = this.route.snapshot.params['id'];
    this.isAddMode = !this.idPatron;

    if (!this.isAddMode) {
      this.patronService.getPatron(this.idPatron)
        .subscribe((patron: Patron) => {
          this.patron = patron;
          this.form.patchValue(patron);
        });

    }
  }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.onAddPatron();
    } else {
      this.onUpdatePatron();
    }
  }

  public onAddPatron(): void {
    this.patron.firstName = this.form.get("firstName")?.value;
    this.patron.lastName = this.form.get("lastName")?.value;
    this.patron.phoneNumber = this.form.get("phoneNumber")?.value;

    this.patronService.addPatron(this.patron).subscribe(
      (response: any) => {
        console.log(this.patron);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public onUpdatePatron(): void {
    this.patron.firstName = this.form.get("firstName")?.value;
    this.patron.lastName = this.form.get("lastName")?.value;
    this.patron.phoneNumber = this.form.get("phoneNumber")?.value;

    this.patronService.updatePatron(this.patron).subscribe(
      (response: any) => {
        console.log(this.patron);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )

  }

}
