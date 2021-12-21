import { TestBed, ComponentFixture, fakeAsync, tick, inject, async, flush } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/service/author.service';
import { of } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { PatronService } from 'src/app/service/patron.service';
import { BooksBorrowedFilterComponent } from './books-borrowed-filter.component';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';


describe('BooksBorrowedFilterComponent', () => {
    let comp: BooksBorrowedFilterComponent;
    let fixture: ComponentFixture<BooksBorrowedFilterComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let mockPatronService;
    let mockBookBorrowedService;


    beforeEach(fakeAsync(() => {

        mockPatronService = jasmine.createSpyObj(['findBooksBorrowed']);
        mockPatronService.findBooksBorrowed.and.returnValue(of([
            {
                id: 0, isbn: 'isbn1', dateBorrowed: '1', toBeReturned: '2', returnedOnTime: true, returned: true,
                patron_id: 1
            },
            {
                id: 2, isbn: 'isbn2', dateBorrowed: '1', toBeReturned: '2', returnedOnTime: false, returned: true,
                patron_id: 1
            }
        ]
        ));


        mockBookBorrowedService = jasmine.createSpyObj(['deleteBookBorrowed']);
        mockBookBorrowedService.deleteBookBorrowed.and.returnValue(of([]));


        TestBed.configureTestingModule({
            declarations: [
                BooksBorrowedFilterComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
                { provide: AuthorService, useValue: [] },
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                idPatron: 1
                            },
                        },
                    },
                },

                { provide: PatronService, useValue: mockPatronService },
                { provide: BookBorrowedService, useValue: mockBookBorrowedService }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(BooksBorrowedFilterComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    it(`should call the onSubmit method and set submitted to true`, fakeAsync(() => {
        spyOn(comp, 'onSubmit');
        comp.form.controls['filterBy'].setValue("1");
        let btn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
        btn.click();
        tick();
        fixture.detectChanges();
        expect(comp.onSubmit).toHaveBeenCalled();
        expect(comp.submitted).toBeTruthy();
    }));

    it(`should call the getBooksNotReturned method and get length equal to 1`, () => {
        comp.form.controls['filterBy'].setValue("1");
        comp.onSubmit();
        fixture.detectChanges();
        expect(comp.booksBorrowed.length).toEqual(1);
    });


    it(`should call the getBooksBorrowed method and get length greater than 0`, () => {
        comp.form.controls['filterBy'].setValue("");
        comp.onSubmit();
        fixture.detectChanges();
        expect(comp.booksBorrowed.length).toEqual(2);
    });


});