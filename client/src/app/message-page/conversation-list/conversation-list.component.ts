import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs';
import {Conversation} from '../../conversation.model';
import {ConversationService} from '../../conversation.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, OnDestroy {

  @Output() selectedConversation = new EventEmitter<Conversation>();

  private conversationSub: Subscription;
  conversations: Conversation;

  constructor(
    private conversationService: ConversationService
  ) { }

  ngOnInit(): void {
    this.conversationSub = this.conversationService.conversations$.subscribe(
      (conversations) =>  {
        console.log('new convos');
        console.log(conversations);
        this.conversations = conversations;
      }
    );
    this.conversationService.getConversations().subscribe();
  }

  ngOnDestroy(): void {
    this.conversationSub.unsubscribe();
  }

  handleClick(conversation: Conversation): void {
    console.log('handle click');
    this.selectedConversation.emit(conversation);
  }

}
