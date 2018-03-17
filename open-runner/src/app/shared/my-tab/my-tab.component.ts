import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'my-tab',
  templateUrl: './my-tab.component.html',
  styleUrls: ['./my-tab.component.css']
})
export class MyTabComponent implements OnInit {
  module: string = environment.module;
  list: any[] = [{
    title: '接口列表',
    link: '/web/site/entry/' + environment.module + '/developword'
  }, {
    title: '错误码说明',
    link: '/web/site/entry/' + environment.module + '/errorcode'
  }, {
    title: 'DEMO下载',
    link: '/web/site/entry/' + environment.module + '/demo'
  }];
  constructor() { }

  ngOnInit() {
  }

}
