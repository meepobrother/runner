import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderRightComponent } from './header-right/header-right.component';
import { HeaderLeftComponent } from './header-left/header-left.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyTabComponent } from './my-tab/my-tab.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { CodeListComponent } from './code-list/code-list.component';
import { ApiListComponent } from './api-list/api-list.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { ProcessTab1Component } from './process-tab1/process-tab1.component';
import { ProcessTab2Component } from './process-tab2/process-tab2.component';
import { ProcessBox1Component } from './process-box1/process-box1.component';
import { ProcessBox2Component } from './process-box2/process-box2.component';
import { HttpClientModule } from '@angular/common/http';
import { We7SrcDirective } from './directives/we7-src.directive';

export const comnponents = [
  HeaderRightComponent,
  HeaderLeftComponent, HeaderMainComponent,
  MyTabComponent, SidebarMenuComponent, CopyrightsComponent,
  CodeListComponent, ApiListComponent,
  DownloadListComponent, ProcessTab1Component,
  ProcessTab2Component, ProcessBox1Component,
  ProcessBox2Component, We7SrcDirective
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    ...comnponents
  ],
  exports: [
    ...comnponents,
    RouterModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class SharedModule { }
