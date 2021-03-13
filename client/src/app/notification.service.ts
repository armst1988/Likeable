import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification} from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification = new BehaviorSubject(null);
  notification$ = this.notification.asObservable();

  constructor() { }

  notify(notification: Notification): void {
    console.log('nexting');
    this.notification.next(notification);
  }
}
