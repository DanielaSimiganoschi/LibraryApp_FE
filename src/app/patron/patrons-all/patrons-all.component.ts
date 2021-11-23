import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patron } from '../../model/patron.model';
import { PatronService } from '../../service/patron.service';

@Component({
  selector: 'app-patrons-all',
  templateUrl: './patrons-all.component.html',
  styleUrls: ['./patrons-all.component.css']
})
export class PatronsAllComponent implements OnInit {

  public patrons: Patron[] = [];

  constructor(private patronService:PatronService, private router: Router) { }

  ngOnInit(): void {
    this.getPatrons();
  }

  public getPatrons(): void {
    this.patronService.getPatrons().subscribe(
      (response: Patron[]) => {
        this.patrons = response;
      },
      (error: HttpErrorResponse) => {
       
      }
    )
  }

}
