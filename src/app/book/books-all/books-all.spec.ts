// import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Router } from '@angular/router';
// import { BooksAllComponent } from './books-all.component';
// import { AuthorService } from 'src/app/service/author.service';
// import { of } from 'rxjs';
// import { BookService } from 'src/app/service/book.service';
// import { ClarityModule, ClrIconModule } from '@clr/angular';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CdsModule } from '@cds/angular';
// import { CommonModule } from '@angular/common';
// import 'globalthis/polyfill';

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
//                 CommonModule,
//                 BrowserModule,
//                 HttpClientTestingModule,
//                 BrowserAnimationsModule,
//                 ClarityModule,
//                 CdsModule,
//                 ClrIconModule
//             ],
//             providers: [
//                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
//                 { provide: AuthorService, useValue: [] },
//                 { provide: BookService, useValue: mockBookService }
//             ]
//         });
//     });

//     it('should create', waitForAsync(() => {
//         fixture = TestBed.createComponent(BooksAllComponent);
//         comp = fixture.componentInstance;
//         fixture.detectChanges();
//         expect(comp).toBeTruthy();
//     }));

//     it(`should call the getBooks method`, waitForAsync(() => {
//         fixture = TestBed.createComponent(BooksAllComponent);
//         comp = fixture.componentInstance;
//         fixture.detectChanges();
//         expect(comp.getBooks.length).toEqual(0);
//     }));


//     it(`should show Modal`, waitForAsync(() => {
//         fixture = TestBed.createComponent(BooksAllComponent);
//         comp = fixture.componentInstance;
//         fixture.detectChanges();

//         comp.deleteBook(1);
//         fixture.detectChanges();
//         expect(comp.isModalVisible).toBeTruthy();
//     }));

// });