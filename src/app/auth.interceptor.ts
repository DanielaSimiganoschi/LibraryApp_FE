import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppUserService } from './service/app-user.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // constructor() { }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   request = request.clone({
  //     headers: request.headers.set('authorization', 'Bearer ' + localStorage.getItem('access_token'),)
  //   })
  //   return next.handle(request);
  // }


  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AppUserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem("access_token");

    if (token && !request.url.includes('refresh')) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return this.handle401Error(request, next);
      }
      return throwError(error);

    }));

  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.callRefreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          localStorage.setItem("access_token", token['access_token']);
          localStorage.setItem("refresh_token", token['refresh_token']);
          this.refreshTokenSubject.next(token['access_token']);
          return next.handle(this.addToken(request, token['access_token']));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}