import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation.component';
import {HttpRequestInterceptor} from './HttpInterceptor';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { NotificationComponent } from './notification/notification.component';
import { AlertComponent } from './alert/alert.component';
import { LocationInputComponent } from './location-input/location-input.component';
import {AgmCoreModule} from '@agm/core';

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
    LocationInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhewic6Ut76KtZeMFDNnv8nruXCGu-hJ4',
      libraries: ['places']
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
