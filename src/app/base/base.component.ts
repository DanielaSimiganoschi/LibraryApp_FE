import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})
export class BaseComponent implements OnInit {

  private _subject: Subject<void> = new Subject<void>();
  constructor() { }
  
  protected get destroy$(): Observable<void> {
    return this._subject.asObservable();
  }

  public ngOnDestroy() {
    this._subject.next();
    this._subject.complete();
  }
  
  ngOnInit(): void {
  }

}