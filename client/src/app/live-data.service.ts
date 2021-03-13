import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class LiveDataService {

  socketSubject: WebSocketSubject<any> = webSocket('ws://localhost:9000');
  socket$ = this.socketSubject.asObservable();

  constructor() { }

  subscribe = () => {
    this.socket$.subscribe(
      data => {
        console.log('received ' + data);
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }
}
