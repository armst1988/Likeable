import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {HomepageComponent} from '../homepage/homepage.component';
import {OrderComponent} from '../order/order.component';
import {MessagePageComponent} from "../message-page/message-page.component";
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {
    path: 'test',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'messages',
    component: MessagePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
