import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private accountSub: Subscription;
  account: Account;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountSub = this.accountService.account$.subscribe(account => this.account = account);
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }

  logout(): any {
    this.accountService.logout();
  }

}
