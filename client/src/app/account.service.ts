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

  private api = 'http://10.0.0.26:8000/api/user';

  private token: string;

  constructor(private http: HttpClient) {
    this.checkStorage();
  }

  checkStorage(): void {
    const data = localStorage.getItem('token');

    if (data) {
      const acct = JSON.parse(data);
      this.token = acct.token;
      this.account.next(acct);
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
    this.token = null;
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

  hasValidToken(): boolean {
    if (this.token) {
      const token = JSON.parse(atob(this.token.split('.')[1]));
      return Date.now() < (token.exp * 1000);
    } else {
      return false;
    }

  }

  private setAccount(account: Account): void {
    this.token = account.token;
    localStorage.setItem('token', JSON.stringify(account));
    this.account.next(account);
  }

  private setError(error: ErrorMessage): void {
    this.error.next(error);
  }

}
