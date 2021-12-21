// import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DebugElement } from '@angular/core';
// import { UserAuthComponent } from './user-auth.component';

// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';


// describe('UserAuthComponent', () => {
//     let comp: UserAuthComponent;
//     let fixture: ComponentFixture<UserAuthComponent>;
//     let de: DebugElement;
//     let el: HTMLElement;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 UserAuthComponent
//             ],
//             imports: [
//                 BrowserModule,
//                 FormsModule,
//                 ReactiveFormsModule,
//                 RouterTestingModule,
//                 HttpClientTestingModule
//             ],
//             providers: [
//                 JwtHelperService,
//                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
//                 { provide: JwtHelperService, useClass: class { decodeToken = jasmine.createSpy("decodeToken"); } }
//             ]
//         });

//         TestBed.compileComponents();
//         fixture = TestBed.createComponent(UserAuthComponent);
//         spyOn(JwtHelperService.prototype, 'decodeToken').and.returnValue(true);
//         comp = fixture.componentInstance;
//         de = fixture.debugElement.query(By.css('form'));
//         el = de.nativeElement;
//         fixture.detectChanges();
//     });


//     it(`should set submitted to true`, waitForAsync(() => {
//         comp.onLoginUser();
//         expect(comp.isSubmitted).toBeTruthy();
//     }));

//     it(`should call the onLoginUser method`, waitForAsync(() => {
//         spyOn(comp, 'onLoginUser');
//         comp.form.controls['username'].setValue('dsimiganoschi');
//         comp.form.controls['password'].setValue('1244');
//         let btn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
//         btn.click();
//         fixture.detectChanges();
//         expect(comp.onLoginUser).toHaveBeenCalled();
//     }));

//     it(`form should be invalid`, waitForAsync(() => {
//         comp.form.controls['username'].setValue('');
//         comp.form.controls['password'].setValue('');

//         expect(comp.form.valid).toBeFalsy();
//     }));

//     it(`form should be valid`, waitForAsync(() => {
//         comp.form.controls['username'].setValue('dsimiganoschi');
//         comp.form.controls['password'].setValue('1244');

//         expect(comp.form.valid).toBeTruthy();
//     }));

//     it('should test input errors', () => {
//         const username = comp.form.controls.username;
//         expect(username.errors?.required).toBeTruthy();
//         username.setValue('dsimiganoschi');
//         expect(username.errors).toBeNull();
//     });
// });