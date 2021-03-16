import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Account} from '../account.model';
import {ErrorMessage} from '../error.model';
import {FormControl, FormGroup} from '@angular/forms';
import {AccountService} from '../account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private accountSub: Subscription;
  private errorSub: Subscription;
  account: Account;
  error: ErrorMessage;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountSub = this.accountService.account$.subscribe((account) => {
      this.account = account;
      if (this.account != null) {
        this.router.navigate(['']);
      }
    });
    this.errorSub = this.accountService.error$.subscribe(error => this.error = error);
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  login(): void {
    this.error = null;
    this.accountService.login(this.loginForm.value)
      .subscribe(() => {
        this.loginForm.reset();
      });
  }

}
