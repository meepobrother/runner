import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { We7RootComponent } from './we7-root/we7-root.component';
import { We7HeaderComponent } from './we7-header/we7-header.component';
import { SystemTipsComponent } from './system-tips/system-tips.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
export const components = [
  We7RootComponent, We7HeaderComponent, SystemTipsComponent,
  LeftMenuComponent
];
import { MenuService } from './menu.service';
import { UtilService, ENVIRONMENT } from './util.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
export function AppStartupFactory(menu: MenuService) {
  return () => menu.load();
}
@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components
  ],
  providers: []
})
export class We7Module {
  static forRoot(enviroment: any): ModuleWithProviders {
    return {
      ngModule: We7Module,
      providers: [
        MenuService,
        UtilService,
        {
          provide: ENVIRONMENT,
          useValue: enviroment
        },
        {
          provide: APP_INITIALIZER,
          useFactory: AppStartupFactory,
          deps: [MenuService],
          multi: true
        }
      ]
    }
  }
}
