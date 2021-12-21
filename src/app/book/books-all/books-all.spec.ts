import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router } from '@angular/router';
import { BooksAllComponent } from './books-all.component';
import { AuthorService } from 'src/app/service/author.service';
import { of } from 'rxjs';
import { BookService } from 'src/app/service/book.service';


describe('BooksAllComponent', () => {
    let comp: BooksAllComponent;
    let fixture: ComponentFixture<BooksAllComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let mockBookService;

    beforeEach(fakeAsync(() => {

        mockBookService = jasmine.createSpyObj(['getBooks']);
        mockBookService.getBooks.and.returnValue(of([]));

        TestBed.configureTestingModule({
            declarations: [
                BooksAllComponent
            ],
            imports: [
                BrowserModule
            ],
            providers: [
                { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
                { provide: AuthorService, useValue: [] },
                { provide: BookService, useValue: mockBookService }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(BooksAllComponent);
            comp = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    it(`should call the getBooks method`, () => {
        expect(comp.getBooks.length).toEqual(0);
    });


    it(`should set submitted to true`, () => {
        comp.deleteBook(1);
        expect(comp.isModalVisible).toBeTruthy();
    });

});