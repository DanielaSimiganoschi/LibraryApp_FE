// import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DebugElement } from '@angular/core';

// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthorService } from 'src/app/service/author.service';
// import { of } from 'rxjs';
// import { BooksFilterComponent } from './books-filter.component';
// import { GenreService } from 'src/app/service/genre.service';
// import { ClarityModule } from '@clr/angular';


// describe('BooksFilterComponent', () => {
//     let comp: BooksFilterComponent;
//     let fixture: ComponentFixture<BooksFilterComponent>;
//     let de: DebugElement;
//     let el: HTMLElement;
//     let mockAuthorService;
//     let mockGenreService;

//     beforeEach(fakeAsync(() => {

//         mockAuthorService = jasmine.createSpyObj(['getAuthors']);
//         mockAuthorService.getAuthors.and.returnValue(of([
//             { id: 0, firstName: 'Haruki', lastName: 'Murakami' },
//         ]
//         ));
//         mockGenreService = jasmine.createSpyObj(['getGenres']);
//         mockGenreService.getGenres.and.returnValue(of([
//             { id: 0, name: 'Comedy' },
//         ]
//         ));

//         TestBed.configureTestingModule({
//             declarations: [
//                 BooksFilterComponent
//             ],
//             imports: [
//                 BrowserModule,
//                 FormsModule,
//                 ReactiveFormsModule,
//                 RouterTestingModule,
//                 HttpClientTestingModule,
//                 ClarityModule
//             ],
//             providers: [
//                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
//                 { provide: AuthorService, useValue: mockAuthorService },
//                 { provide: GenreService, useValue: mockGenreService },
//                 { provide: AuthorService, useValue: mockAuthorService },
//                 {
//                     provide: ActivatedRoute, useValue: {
//                         snapshot: {
//                             params: {
//                                 id: ''
//                             },
//                         },
//                     },
//                 },
//             ]
//         }).compileComponents().then(() => {
//             fixture = TestBed.createComponent(BooksFilterComponent);
//             comp = fixture.componentInstance;
//             de = fixture.debugElement.query(By.css('form'));
//             el = de.nativeElement;
//             fixture.detectChanges();
//         });
//     }));


//     it('should create', () => {
//         expect(comp).toBeTruthy();
//     });

//     it(`should call the getAuthors method and get length 1`, () => {
//         comp.getAuthors();
//         expect(comp.authors.length).toEqual(1);
//     });

//     it(`should call the getGenres method and get length 1`, () => {
//         comp.getGenres();
//         expect(comp.genres.length).toEqual(1);
//     });

// });