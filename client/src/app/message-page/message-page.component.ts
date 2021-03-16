import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {ConversationService} from '../conversation.service';
import {LiveDataService} from '../live-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.css']
})
export class MessagePageComponent implements OnInit {

  private liveDataSub: Subscription;

  constructor(
    private messageService: ConversationService,
    private liveDataService: LiveDataService
  ) { }

  ngOnInit(): void {
    this.liveDataSub = this.liveDataService.message$.subscribe((msg) => {
      if (msg !== null) {
        this.messageService.updateMessagesAndConversations(msg);
      }
    });
  }

  onConversationSelected(messageStub: Message): void {
    this.messageService.getConversationMessages(messageStub).subscribe();
  }
}
