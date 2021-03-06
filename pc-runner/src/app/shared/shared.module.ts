import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { HttpClientModule } from '@angular/common/http';
import { CityListsComponent } from './city-lists/city-lists.component';
import { EwmPayComponent } from './ewm-pay/ewm-pay.component';
import { AddressListsComponent } from './address-lists/address-lists.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { FooterComponent } from './footer/footer.component';
import { OrderNavComponent } from './order-nav/order-nav.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { CategoryComponent } from './category/category.component';
import { LineTimeComponent } from './line-time/line-time.component';
import { QueueTimesComponent } from './queue-times/queue-times.component';
import { TimeSelectComponent } from './time-select/time-select.component';
import { PayStep2Component } from './pay-step2/pay-step2.component';
import { PayStep1Component } from './pay-step1/pay-step1.component';
import { UuPayComponent } from './uu-pay/uu-pay.component';
import { We7SrcDirective } from './directives/we7-src.directive';
import { NavWrapComponent } from './nav-wrap/nav-wrap.component';
import { ViewMapComponent } from './view-map/view-map.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    CityListsComponent,
    EwmPayComponent,
    AddressListsComponent,
    CopyrightsComponent,
    FooterComponent,
    OrderNavComponent,
    NavListComponent,
    CategoryComponent,
    LineTimeComponent,
    QueueTimesComponent,
    TimeSelectComponent,
    PayStep2Component,
    PayStep1Component,
    UuPayComponent,
    We7SrcDirective,
    NavWrapComponent,
    ViewMapComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    CityListsComponent,
    EwmPayComponent,
    AddressListsComponent,
    CopyrightsComponent,
    FooterComponent,
    OrderNavComponent,
    NavListComponent,
    CategoryComponent,
    LineTimeComponent,
    QueueTimesComponent,
    TimeSelectComponent,
    UuPayComponent,
    We7SrcDirective,
    NavWrapComponent
  ]
})
export class SharedModule { }
