import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuRootComponent } from './menu-root/menu-root.component';
import { SettingComponent } from './setting/setting.component';
import { We7Module } from '../we7/we7.module';
import { SettingService } from './setting.service';
import { environment } from '../../environments/environment.prod';
@NgModule({
  imports: [
    CommonModule,
    MenuRoutingModule,
    We7Module
  ],
  declarations: [MenuRootComponent, SettingComponent],
  providers: [
    SettingService
  ]
})
export class MenuModule { }
