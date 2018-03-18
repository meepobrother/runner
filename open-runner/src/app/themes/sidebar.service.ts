import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable()
export class SidebarService {
  menus: any[] = [];
  constructor() { 
    this.setFreeMenu();
  }

  setMenus(menus: any[]) {
    this.menus = menus;
  }

  setLoginMenu() {
    this.menus = [{
      title: '开发文档',
      link: '/web/site/entry/' + environment.module + '/developword'
    }, {
      title: '错误代码',
      link: '/web/site/entry/' + environment.module + '/errorcode'
    }, {
      title: 'Demo下载',
      link: '/web/site/entry/' + environment.module + '/demo'
    }, {
      title: '我的资料',
      link: '/web/site/entry/' + environment.module + '/profiles'
    }];
  }

  setFreeMenu() {
    this.menus = [{
      title: '开发文档',
      link: '/web/site/entry/' + environment.module + '/developword'
    }, {
      title: '错误代码',
      link: '/web/site/entry/' + environment.module + '/errorcode'
    }, {
      title: 'Demo下载',
      link: '/web/site/entry/' + environment.module + '/demo'
    }];
  }

}
