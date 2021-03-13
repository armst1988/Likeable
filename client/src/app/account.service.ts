import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from './account.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ErrorMessage} from './error.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account = new BehaviorSubject(null);
  account$ = this.account.asObservable();

  private error = new BehaviorSubject(null);
  error$ = this.error.asObservable();

  private api = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient) {
    this.checkStorage();
  }

  checkStorage(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.account.next(JSON.parse(token));
    }
  }

  login(account: Account): Observable<Account | ErrorMessage> {
    return this.http.post<Account | ErrorMessage>(this.api + '/login', account)
      .pipe(
        tap((resp: any) => {
          if (!resp.message) {
            this.setAccount(resp);
          } else {
            this.setError(resp);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.account.next(null);
  }

  register(account: Account): Observable<Account | ErrorMessage> {
    return this.http.post<Account | ErrorMessage>(this.api, account)
      .pipe(
        tap((resp: any) => {
          if (!resp.message) {
            this.setAccount(resp);
          } else {
            this.setError(resp);
          }
        })
      );
  }

  private setAccount(account: Account): void {
    localStorage.setItem('token', JSON.stringify(account));
    this.account.next(account);
  }

  private setError(error: ErrorMessage): void {
    this.error.next(error);
  }

}
