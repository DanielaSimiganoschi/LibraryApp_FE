import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIsbnComponent } from './add-isbn.component';

describe('AddIsbnComponent', () => {
  let component: AddIsbnComponent;
  let fixture: ComponentFixture<AddIsbnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIsbnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIsbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
