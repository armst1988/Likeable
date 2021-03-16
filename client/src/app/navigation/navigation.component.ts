import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private accountSub: Subscription;
  account: Account;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountSub = this.accountService.account$.subscribe(account => this.account = account);
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }

  logout(): any {
    this.accountService.logout();
    this.router.navigate(['test']);
  }

}
