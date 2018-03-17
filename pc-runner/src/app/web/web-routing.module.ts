import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendComponent } from './send/send.component';
import { BuyComponent } from './buy/buy.component';
import { TakeComponent } from './take/take.component';
import { TakeOrderComponent } from './take-order/take-order.component';
import { WebRootComponent } from './web-root/web-root.component';
const routes: Routes = [{
  path: '',
  component: WebRootComponent,
  children: [
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
