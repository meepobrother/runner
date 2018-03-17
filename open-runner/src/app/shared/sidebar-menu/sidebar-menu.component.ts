import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  module: string = environment.module;

  list: any[] = [{
    title: '开发文档',
    link: '/web/site/entry/' + environment.module + '/developword'
  }, {
    title: '错误代码',
    link: '/web/site/entry/' + environment.module + '/errorcode'
  }, {
    title: 'Demo下载',
    link: '/web/site/entry/' + environment.module + '/demo'
  }];
  constructor() { }

  ngOnInit() {
  }

}
