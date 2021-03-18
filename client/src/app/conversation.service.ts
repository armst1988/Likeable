import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Conversation} from './conversation.model';
import {tap} from 'rxjs/operators';
import {Message} from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private conversations = new BehaviorSubject(null);
  conversations$ = this.conversations.asObservable();

  private messages = new BehaviorSubject(null);
  messages$ = this.messages.asObservable();

  private recipient = new BehaviorSubject(null);
  recipient$ = this.recipient.asObservable();

  private api = 'http://10.0.0.26:8000/api/messages';

  constructor(private http: HttpClient) { }

  getConversations(): Observable<Conversation> {
    return this.http.get<Conversation>(this.api)
      .pipe(
        tap((resp: any) => {
          this.setConversations(resp);
        })
      );
  }

  getConversationMessages(message: Message): Observable<Message[]> {
    return this.http.get<Message[]>(this.api + '/' + message.conversationId)
      .pipe(
        tap((resp: any) => {
          this.setMessages(resp);
          this.setRecipient(message.with);
        })
      );
  }

  private setConversations(conversations: any): void {
    this.conversations.next(conversations.amessages);
  }

  private setMessages(messages: Message[]): void {
    this.messages.next(messages);
  }

  private setRecipient(acct: Account): void {
    this.recipient.next(acct);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.api, message)
      .pipe(
        tap((resp: any) => {
          this.updateMessagesAndConversations(message);
        })
      );
  }

  updateMessagesAndConversations(newMessage: Message): void {
    if (newMessage.conversationId === this.messages.getValue()[0].conversationId) {
      const messages = this.messages.getValue();
      messages.push(newMessage);
      this.messages.next(messages);
    }

    const conversations = this.conversations.getValue();


    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].conversationId === newMessage.conversationId) {
        conversations[i] = newMessage;
      }
    }

    this.conversations.next(conversations);
  }
}
