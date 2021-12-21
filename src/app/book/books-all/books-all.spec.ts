// import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { BooksAllComponent } from './books-all.component';
// import { AuthorService } from 'src/app/service/author.service';
// import { of } from 'rxjs';
// import { BookService } from 'src/app/service/book.service';
// import { ClarityModule } from '@clr/angular/clr-angular.module';


// describe('BooksAllComponent', () => {
//     let comp: BooksAllComponent;
//     let fixture: ComponentFixture<BooksAllComponent>;
//     let mockBookService;

//     beforeEach(() => {

//         mockBookService = jasmine.createSpyObj(['getBooks']);
//         mockBookService.getBooks.and.returnValue(of([]));

//         TestBed.configureTestingModule({
//             declarations: [
//                 BooksAllComponent
//             ],
//             imports: [
//                 BrowserModule,
//                 HttpClientTestingModule,
//                 ClarityModule
//             ],
//             providers: [
//                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
//                 { provide: AuthorService, useValue: [] },
//                 { provide: BookService, useValue: mockBookService }
//             ]
//         });
//             TestBed.compileComponents();
//             fixture = TestBed.createComponent(BooksAllComponent);
//             comp = fixture.componentInstance;
//             fixture.detectChanges();
      
//     });


//     it('should create', waitForAsync(() => {
//         expect(comp).toBeTruthy();
//     }));

//     it(`should call the getBooks method`, waitForAsync(() => {
//         expect(comp.getBooks.length).toEqual(0);
//     }));


//     it(`should show Modal`, waitForAsync(() => {
//         comp.deleteBook(1);
//         expect(comp.isModalVisible).toBeTruthy();
//     }));

// });