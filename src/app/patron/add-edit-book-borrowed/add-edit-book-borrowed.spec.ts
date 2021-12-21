import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/service/author.service';
import { of } from 'rxjs';
import { AddEditBookBorrowedComponent } from './add-edit-book-borrowed.component';
import { BookBorrowedService } from 'src/app/service/book-borrowed.service';
import { BookService } from 'src/app/service/book.service';
import { PatronService } from 'src/app/service/patron.service';


describe('AddEditBookBorrowedComponent', () => {
    let comp: AddEditBookBorrowedComponent;
    let fixture: ComponentFixture<AddEditBookBorrowedComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let mockBookBorrowedService;
    let mockBookService;
    let mockPatronService;


    beforeEach((done) => {

        mockBookBorrowedService = jasmine.createSpyObj(['getBookBorrowed']);
        mockBookBorrowedService.getBookBorrowed.and.returnValue(of([
            { id: 0, firstName: 'Haruki', lastName: 'Murakami' },
        ]
        ));

        mockPatronService = jasmine.createSpyObj(['addBookBorrowed']);
        mockPatronService.addBookBorrowed.and.returnValue(of([
            { id: 0, firstName: 'Haruki', lastName: 'Murakami' },
        ]
        ));


        mockBookService = jasmine.createSpyObj(['getBooks']);
        mockBookService.getBooks.and.returnValue(of([
            {
                id: 1, title: 'title 1', publishedDate: '11/10/2021', quantity: 1, description: 'description 1', author: { "id": 2, "firstName": "Oscar", "lastName": "Wilde" },
                isbns: [{ id: 1, borrowed: false, book_id: 1, isbn: "isbn1 carte1" },
                { id: 2, borrowed: false, book_id: 1, isbn: "isbn2 carte1" }], genres: [{ id: 1, name: "Comedy" }]
            }
        ]));


        TestBed.configureTestingModule({
            declarations: [
                AddEditBookBorrowedComponent
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
                                idBookBorrowed: '',
                                idPatron: ''
                            },
                        },
                    },
                },
                {provide: BookBorrowedService, useValue: mockBookBorrowedService},
                { provide: BookService, useValue: mockBookService },
                { provide: PatronService, useValue: mockPatronService }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AddEditBookBorrowedComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
            fixture.detectChanges();
            done();
        });
    });
    afterAll(() => {
        TestBed.resetTestingModule();
      });

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    it(`should call the getBooks method`, () => {
        expect(comp.books.length).toBeGreaterThan(0);
    });

    it(`should set submitted to true when onSubmit is called`, () => {
        comp.onSubmit();
        expect(comp.submitted).toBeTruthy();
    });

    it(`should call the onAddBookBorrowed method`, () => {
        spyOn(comp, 'onAddBookBorrowed');
        comp.form.controls['book'].setValue({
            id: 1, title: 'title 1', publishedDate: '11/10/2021', quantity: 1, description: 'description 1', author: { "id": 2, "firstName": "Oscar", "lastName": "Wilde" },
            isbns: [{ id: 1, borrowed: false, book_id: 1, isbn: "isbn1 carte1" },
            { id: 2, borrowed: false, book_id: 1, isbn: "isbn2 carte1" }], genres: [{ id: 1, name: "Comedy" }]
        });
        comp.form.controls['isbn'].setValue({ id: 2, borrowed: false, book_id: 1, isbn: "isbn2 carte1" });
        comp.onSubmit();
        expect(comp.onAddBookBorrowed).toHaveBeenCalled();
    });



    it(`form should be invalid`, () => {
        comp.form.controls['book'].setValue('');
        comp.form.controls['isbn'].setValue('');

        expect(comp.form.valid).toBeFalsy();

    });

    it(`form should be valid`, () => {
        comp.form.controls['book'].setValue({
            id: 1, title: 'title 1', publishedDate: '11/10/2021', quantity: 1, description: 'description 1', author: { "id": 2, "firstName": "Oscar", "lastName": "Wilde" },
            isbns: [{ id: 1, borrowed: false, book_id: 1, isbn: "isbn1 carte1" },
            { id: 2, borrowed: false, book_id: 1, isbn: "isbn2 carte1" }], genres: [{ id: 1, name: "Comedy" }]
        });
        comp.form.controls['isbn'].setValue({ id: 2, borrowed: false, book_id: 1, isbn: "isbn2 carte1" });


        expect(comp.form.valid).toBeTruthy();
    });

    it('should test input errors', () => {
        const isbn = comp.form.controls.isbn;
        expect(isbn.errors?.required).toBeTruthy();
        isbn.setValue({ id: 2, borrowed: false, book_id: 1, isbn: "isbn2 carte1" });
        expect(isbn.errors).toBeNull();
    });

});