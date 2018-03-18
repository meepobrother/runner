import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetComponent } from './forget/forget.component';
import { DevelopwordComponent } from './developword/developword.component';
import { ErrorcodeComponent } from './errorcode/errorcode.component';
import { DemoComponent } from './demo/demo.component';
import { ProcessComponent } from './process/process.component';
import { WordshowComponent } from './wordshow/wordshow.component';
import { SgintokenComponent } from './sgintoken/sgintoken.component';
import { IndexComponent } from './index/index.component';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'forget',
  component: ForgetComponent
}, {
  path: 'developword',
  component: DevelopwordComponent
}, {
  path: 'errorcode',
  component: ErrorcodeComponent
}, {
  path: 'demo',
  component: DemoComponent
}, {
  path: 'process',
  component: ProcessComponent
}, {
  path: 'index',
  component: LoginComponent
}, {
  path: 'home',
  component: IndexComponent
}, {
  path: 'wordshow',
  component: WordshowComponent
}, {
  path: 'sgintoken',
  component: SgintokenComponent
}, {
  path: 'profiles',
  component: ProfilesComponent
}, {
  path: '**',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
