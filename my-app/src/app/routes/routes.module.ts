import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { LayoutModule } from '../layout/layout.module';
import { WelcomeComponent } from './systems/welcome/welcome.component';
import { UninstallComponent } from './systems/uninstall/uninstall.component';
import { UpgradeComponent } from './systems/upgrade/upgrade.component';
import { SettingComponent } from './systems/setting/setting.component';
import { SettingSystemComponent } from './systems/setting/setting-system/setting-system.component';
import { SettingShareComponent } from './systems/setting/setting-share/setting-share.component';
import { SettingSmsComponent } from './systems/setting/setting-sms/setting-sms.component';
import { SettingTplComponent } from './systems/setting/setting-tpl/setting-tpl.component';
import { SettingOpenComponent } from './systems/setting/setting-open/setting-open.component';
import { SettingApiComponent } from './systems/setting/setting-api/setting-api.component';
import { TasksComponent } from './systems/tasks/tasks.component';
import { AppOpenComponent } from './entry/app/app.component';
import { WebOpenComponent } from './entry/web/web.component';
import { FangwenComponent } from './total/fangwen/fangwen.component';
import { RunnersComponent } from './systems/runners/runners.component';
import { ShopsComponent } from './systems/shops/shops.component';
import { MembersComponent } from './systems/members/members.component';

@NgModule({
    imports: [SharedModule, RouteRoutingModule, LayoutModule],
    declarations: [
        DashboardComponent,
        // passport pages
        UserLoginComponent,
        UserRegisterComponent,
        UserRegisterResultComponent,
        // single pages
        CallbackComponent,
        Exception403Component,
        Exception404Component,
        Exception500Component,
        WelcomeComponent,
        UninstallComponent,
        UpgradeComponent,
        SettingComponent,
        SettingSystemComponent,
        SettingShareComponent,
        SettingSmsComponent,
        SettingTplComponent,
        SettingOpenComponent,
        SettingApiComponent,
        TasksComponent,
        AppOpenComponent,
        WebOpenComponent,
        FangwenComponent,
        RunnersComponent,
        ShopsComponent,
        MembersComponent
    ]
})
export class RoutesModule { }
