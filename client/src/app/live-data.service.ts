import {Injectable, Injector} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';
import {BehaviorSubject, Subscription} from 'rxjs';
import {AccountService} from './account.service';
import {Account} from './account.model';
import {ConversationService} from './conversation.service';

@Injectable({
  providedIn: 'root'
})
export class LiveDataService {

  socketSubject: WebSocketSubject<any> = webSocket('ws://10.0.0.26:9000');
  socket$ = this.socketSubject.asObservable();

  private message = new BehaviorSubject(null);
  message$ = this.message.asObservable();

  private accountSub: Subscription;
  private account: Account;

  constructor(
    accountService: AccountService
  ) {
    this.subscribe();
    this.accountSub = accountService.account$.subscribe((acct) => this.account = acct);
  }

  subscribe(): void {
    this.socket$.subscribe(
      data => {
        if (data.type === 'message') {
          this.message.next(data.payload);
        } else if (data.type === 'challenge') {
          const response = {type: 'response', data: this.account.token};
          this.socketSubject.next(response);
        } else if (data.type === 'newMessage') {
          this.message.next(data.payload);
        }
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }
}
