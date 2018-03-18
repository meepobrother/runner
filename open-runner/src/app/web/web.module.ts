import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { DevelopwordComponent } from './developword/developword.component';
import { ErrorcodeComponent } from './errorcode/errorcode.component';
import { DemoComponent } from './demo/demo.component';
import { ProcessComponent } from './process/process.component';

import { SharedModule } from '../shared/shared.module';
import { WordshowComponent } from './wordshow/wordshow.component';
import { SgintokenComponent } from './sgintoken/sgintoken.component';
import { IndexComponent } from './index/index.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { TianqiFeeComponent } from './profiles/tianqi-fee/tianqi-fee.component';
import { JuliFeeComponent } from './profiles/juli-fee/juli-fee.component';
import { WeightFeeComponent } from './profiles/weight-fee/weight-fee.component';
import { TimeFeeComponent } from './profiles/time-fee/time-fee.component';
import { LouFeeComponent } from './profiles/lou-fee/lou-fee.component';
import { TimelongFeeComponent } from './profiles/timelong-fee/timelong-fee.component';
import { BaojiaFeeComponent } from './profiles/baojia-fee/baojia-fee.component';

@NgModule({
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent, RegisterComponent,
    ForgetComponent, DevelopwordComponent,
    ErrorcodeComponent, DemoComponent,
    ProcessComponent,
    WordshowComponent,
    SgintokenComponent,
    IndexComponent,
    ProfilesComponent,
    TianqiFeeComponent,
    JuliFeeComponent,
    WeightFeeComponent,
    TimeFeeComponent,
    LouFeeComponent,
    TimelongFeeComponent,
    BaojiaFeeComponent
  ]
})
export class WebModule { }
