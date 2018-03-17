import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { SendComponent } from './send/send.component';
import { SharedModule } from '../shared/shared.module';
import { BuyComponent } from './buy/buy.component';
import { TakeComponent } from './take/take.component';
import { TakeOrderComponent } from './take-order/take-order.component';
import { WebRootComponent } from './web-root/web-root.component';

@NgModule({
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ],
  declarations: [SendComponent, BuyComponent, TakeComponent, TakeOrderComponent, WebRootComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebModule { }
