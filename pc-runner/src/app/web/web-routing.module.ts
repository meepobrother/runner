import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendComponent } from './send/send.component';
import { BuyComponent } from './buy/buy.component';
import { TakeComponent } from './take/take.component';
import { TakeOrderComponent } from './take-order/take-order.component';
import { WebRootComponent } from './web-root/web-root.component';

import { IndexComponent } from './index/index.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { CooperationComponent } from './cooperation/cooperation.component';
import { DriverComponent } from './driver/driver.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '',
  component: WebRootComponent,
  children: [
    {
      path: '',
      component: IndexComponent
    }, {
      path: 'index',
      component: IndexComponent
    }, {
      path: 'introduction',
      component: IntroductionComponent
    }, {
      path: 'cooperation',
      component: CooperationComponent
    }, {
      path: 'driver',
      component: DriverComponent
    }, {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'send',
      component: SendComponent
    }, {
      path: 'buy',
      component: BuyComponent
    }, {
      path: 'take',
      component: TakeComponent
    }, {
      path: 'takeorder',
      component: TakeOrderComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
