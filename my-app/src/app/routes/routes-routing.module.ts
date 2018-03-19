import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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
import { WelcomeComponent } from './systems/welcome/welcome.component';
import { UninstallComponent } from './systems/uninstall/uninstall.component';
import { UpgradeComponent } from './systems/upgrade/upgrade.component';
import { SettingComponent } from './systems/setting/setting.component';
import { TasksComponent } from './systems/tasks/tasks.component';
import { AppOpenComponent } from './entry/app/app.component';
import { WebOpenComponent } from './entry/web/web.component';
import { FangwenComponent } from './total/fangwen/fangwen.component';


import { RunnersComponent } from './systems/runners/runners.component';
import { ShopsComponent } from './systems/shops/shops.component';
import { MembersComponent } from './systems/members/members.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
            { path: 'index', component: DashboardComponent, data: { title: '选择公众号' } },
            { path: 'welcome', component: WelcomeComponent, data: { title: '欢迎使用' } },
            { path: 'appopen', component: AppOpenComponent, data: { title: '前台入口' } },
            { path: 'webopen', component: WebOpenComponent, data: { title: 'pc入口' } },
            { path: 'uninstall', component: UninstallComponent, data: { title: '卸载模块' } },
            { path: 'upgrade', component: UpgradeComponent, data: { title: '更新模块' } },
            { path: 'setting', component: SettingComponent, data: { title: '系统设置' } },
            { path: 'tasks', component: TasksComponent, data: { title: '任务管理' } },
            { path: 'runners', component: RunnersComponent, data: { title: '跑腿管理' } },
            { path: 'shops', component: ShopsComponent, data: { title: '店铺管理' } },
            { path: 'members', component: MembersComponent, data: { title: '会员管理' } },
            
            { path: 'fangwen', component: FangwenComponent, data: { title: '访问统计' } },
        ]
    },
    {
        path: '',
        component: LayoutPassportComponent,
        children: [
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegisterComponent },
            { path: 'register-result', component: UserRegisterResultComponent }
        ]
    },
    { path: 'callback/:type', component: CallbackComponent },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RouteRoutingModule { }
