import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotificationComponent} from '../notification/notification.component';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public key: number;
  public parentRef: NotificationComponent;
  public view: any;
  public classStyle: string;
  public animationState = 'invisible';

  @ViewChild('alert') alertRef: ElementRef;

  constructor(private ref: ElementRef) { }

  ngOnInit(): void {
    this.ref.nativeElement.style.opacity = 0;
    setTimeout(() => {
      this.ref.nativeElement.style.opacity = 0.99;
    });
    setTimeout(() => {
      this.ref.nativeElement.style.height = '0px';
      this.ref.nativeElement.style.opacity = 0;
      setTimeout(() => {
        this.remove();
      }, 800);
    }, 5000);
  }

  remove(): void {
    this.parentRef.removeNotification(this.key);
  }

}
