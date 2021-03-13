import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../account.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ErrorMessage} from '../error.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private accountSub: Subscription;
  private errorSub: Subscription;
  account: Account;
  error: ErrorMessage;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountSub = this.accountService.account$.subscribe(account => this.account = account);
    this.errorSub = this.accountService.error$.subscribe(error => this.error = error);
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  login(): void {
    this.error = null;
    this.accountService.register(this.loginForm.value)
      .subscribe(() => {
        this.loginForm.reset();
      });
  }

}
