import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AccountService} from './account.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: any = localStorage.getItem('token');

    if (token) {
      token = JSON.parse(token);
      req = req.clone(
        {
          headers: req.headers.set('Authorization', 'Bearer ' + token.token)
        }
      );
    }

    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse, caught: any) => {
          if (err.status === 401) {
            this.accountService.logout();
            this.router.navigate(['test']);
          }
          return throwError(err);
        })
      );
  }
}
