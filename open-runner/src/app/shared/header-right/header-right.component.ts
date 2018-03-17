import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'header-right',
  templateUrl: './header-right.component.html',
  styleUrls: ['./header-right.component.css']
})
export class HeaderRightComponent implements OnInit {
  module: string = environment.module;
  list: any[] = [{
    title: '返回首页',
    link: '/web/site/entry/' + environment.module + '/index'
  }, {
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
