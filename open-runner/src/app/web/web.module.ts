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
    SgintokenComponent
  ]
})
export class WebModule { }
