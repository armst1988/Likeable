import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation.component';
import {HttpRequestInterceptor} from './HttpInterceptor';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { NotificationComponent } from './notification/notification.component';
import { AlertComponent } from './alert/alert.component';
import { LocationInputComponent } from './location-input/location-input.component';
import { StyledInputComponent } from './styled-input/styled-input.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { ConversationListComponent } from './message-page/conversation-list/conversation-list.component';
import { ConversationViewComponent } from './message-page/conversation-view/conversation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomepageComponent,
    NavigationComponent,
    LoginComponent,
    OrderComponent,
    NotificationComponent,
    AlertComponent,
    LocationInputComponent,
    StyledInputComponent,
    MessagePageComponent,
    ConversationListComponent,
    ConversationViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
