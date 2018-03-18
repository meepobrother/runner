import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuRootComponent } from './menu-root/menu-root.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [{
  path: '',
  component: MenuRootComponent,
  children: [
    {
      path: 'index',
      component: SettingComponent
    },
    {
      path: 'setting',
      component: SettingComponent
    }, {
      path: "**",
      component: SettingComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
