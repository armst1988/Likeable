import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Message} from '../../message.model';
import {ConversationService} from '../../conversation.service';
import {Account} from '../../account.model';
import {AccountService} from '../../account.service';

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.css']
})
export class ConversationViewComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scrollMe') private messagesContainer: ElementRef;

  private messageSub: Subscription;
  messages: Message[];

  private accountSub: Subscription;
  account: Account;

  private recipientSub: Subscription;
  recipient: Account;

  messageText: string;

  constructor(
    private messageService: ConversationService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.messageSub = this.messageService.messages$.subscribe(messages => this.messages = messages);
    this.accountSub = this.accountService.account$.subscribe(acct => this.account = acct);
    this.recipientSub = this.messageService.recipient$.subscribe(rec => this.recipient = rec);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.messageSub.unsubscribe();
    this.recipientSub.unsubscribe();
    this.accountSub.unsubscribe();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err: any) { }
  }

  sendMessage(): void {
    const message: Message = new Message();
    message.conversationId = this.messages[0].conversationId;
    message.recipient = this.recipient.id;
    message.sender = this.account.id;
    message.message = this.messageText;
    message.tip = false;
    this.messageService.sendMessage(message).subscribe(() => {
      this.messageText = '';
    });
  }

}
