import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  tabs: any[] = [{
    title: '商业用户',
    desc: '自身作为运营者，直接面对用户销售',
    active: true,
    code: 'tab1'
  }, {
    title: '开发者',
    desc: '自身拥有技术，可一开发针对跑腿功能的插件',
    active: false,
    code: 'tab2'
  }];

  activeTab: any;
  constructor() { }

  ngOnInit() {
    this.tabs.map(res => {
      if (res.active) {
        this.onTab(res);
      }
    });
  }

  onTab(item: any) {
    this.tabs.map(tab => {
      tab.active = false;
    });
    item.active = true;
    this.activeTab = item;
  }

}
