import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {Subscription} from 'rxjs';
import {Account} from '../account.model';
import {NotificationService} from '../notification.service';
import {Notification} from '../notification.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  accountSub: Subscription;
  account: Account;

  constructor(private accountService: AccountService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.accountSub = this.accountService.account$.subscribe(result => this.account = result);
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }

  sendNotify(): void {
    console.log('sending notification');
    const notification = new Notification();
    notification.message = 'Hello!';
    notification.style = null;
    this.notificationService.notify(notification);
  }
}
