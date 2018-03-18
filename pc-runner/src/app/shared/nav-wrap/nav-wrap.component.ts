import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'nav-wrap',
  templateUrl: './nav-wrap.component.html',
  styleUrls: ['./nav-wrap.component.scss']
})
export class NavWrapComponent implements OnInit {
  list: any[] = [{
    title: '首页',
    link: this.getLink('index')
  }, {
    title: '服务介绍',
    link: this.getLink('introduction')
  }, {
    title: '在线下单',
    link: this.getLink('buy')
  }, {
    title: '招商加盟',
    link: this.getLink('cooperation')
  }, {
    title: '加入跑男',
    link: this.getLink('driver')
  }];

  @Input() city: string;
  @Input() mobile: string;

  @Output() onLogin: EventEmitter<any> = new EventEmitter();
  @Output() onLogout: EventEmitter<any> = new EventEmitter();

  @Input() title: string = '小明跑腿';

  constructor() { }

  ngOnInit() {
  }

  getLink(_do: string) {
    return ['/', environment.path, environment.c, environment.a, environment.module, _do];
  }

  logout() {
    this.onLogout.emit();
  }

}
