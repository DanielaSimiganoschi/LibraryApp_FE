import { TestBed, ComponentFixture} from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditBookComponent } from './add-edit-book.component';
import { AuthorService } from 'src/app/service/author.service';
import { of } from 'rxjs';


describe('AddEditBookComponent', () => {
    let comp: AddEditBookComponent;
    let fixture: ComponentFixture<AddEditBookComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let mockAuthorService;

    beforeEach(((done) => {

        mockAuthorService = jasmine.createSpyObj(['getAuthors']);
        mockAuthorService.getAuthors.and.returnValue(of( [
              { id: 0, firstName: 'Haruki', lastName: 'Murakami'},
              ]
          ));

        TestBed.configureTestingModule({
            declarations: [
                AddEditBookComponent
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
                { provide: JwtHelperService, useClass: class { decodeToken = jasmine.createSpy("decodeToken"); } },
                { provide: AuthorService, useValue: []},
                { provide: ActivatedRoute, useValue: {
                    snapshot: {
                        params: {
                            id:''
                        },
                    },
                },},
                { provide: AuthorService, useValue: mockAuthorService } 
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AddEditBookComponent);
            spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue(true);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
            fixture.detectChanges();
            done();
        });
    }));

    afterAll(() => {
        TestBed.resetTestingModule();
      });

    it('should create', () => {
        expect(comp).toBeTruthy();
      });

    it(`should call the getAuthors method`, () => {
        expect(comp.authors.length).toBeGreaterThan(0);
    });

   
    it(`should set submitted to true`, () => {
        comp.onSubmit();
        expect(comp.submitted).toBeTruthy();
    });


    it(`form should be invalid`, () => {
        comp.form.controls['title'].setValue('');
        comp.form.controls['description'].setValue('');
        comp.form.controls['publishedDate'].setValue('');
        comp.form.controls['author'].setValue('');
        comp.form.controls['quantity'].setValue('');
        comp.form.controls['isbns'].setValue([]);
        comp.form.controls['genres'].setValue([]);

        expect(comp.form.valid).toBeFalsy();

    });

    it(`form should be valid`, () => {
        comp.form.controls['title'].setValue('fdfds');
        comp.form.controls['description'].setValue('fdfd');
        comp.form.controls['publishedDate'].setValue('fdfds');
        comp.form.controls['author'].setValue({id:1, firstName:"m", lastName:"s"});
        comp.form.controls['quantity'].setValue(1);
        comp.form.controls['isbns'].setValue([{isbn:"dsadgfdggaasa"}]);
        comp.form.controls['genres'].setValue([{id:1, name:"dsadsa"}]);

        expect(comp.form.valid).toBeTruthy();
    });

    it('should test input errors', () => {
        const title = comp.form.controls.title;
        expect(title.errors?.required).toBeTruthy();
        title.setValue('title');
        expect(title.errors).toBeNull();
    });

});