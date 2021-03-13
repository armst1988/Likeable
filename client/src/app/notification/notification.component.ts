import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {NotificationService} from '../notification.service';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../alert/alert.component';
import {Notification} from '../notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @ViewChild('notifyContainer', {read: ViewContainerRef}) containerRef: ViewContainerRef;

  notifySub: Subscription;
  childKey = 0;
  childReferences = Array<ComponentRef<AlertComponent>>();

  constructor(private notificationService: NotificationService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.notifySub = this.notificationService.notification$.subscribe(notification => {
      this.addNotification(notification);
    });
  }

  addNotification(notification: Notification): void {
    if (notification === null) {
      return;
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertComponentRef = this.containerRef.createComponent(factory);

    const alertComponent = alertComponentRef.instance;
    this.childKey++;
    alertComponent.key = this.childKey;
    alertComponent.parentRef = this;
    alertComponent.classStyle = notification.style;
    alertComponent.view = alertComponentRef.hostView;
    this.childReferences.push(alertComponentRef);
  }

  removeNotification(key: number): void {
    const ref = this.childReferences.filter(x => x.instance.key === key)[0];
    const containerIdx = this.containerRef.indexOf(ref.hostView);
    this.containerRef.remove(containerIdx);
  }

}
