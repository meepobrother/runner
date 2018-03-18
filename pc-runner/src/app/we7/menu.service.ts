import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable()
export class MenuService {
  msg: string = '';
  // app设置
  app: any = {
    title: '',
    logo: ''
  };
  // 账户设置
  account: any = {
    title: '',
    logo: ''
  };
  // 所有账户
  accounts: any[] = [];
  // 插件
  plugins: any[] = [];
  nav2s: any[] = [
    {
      title: '我的账号',
      icon: 'wi wi-account color-gray',
      link: './index.php?c=user&a=profile&'
    }, {
      title: '',
      icon: 'divider',
    }, {
      title: '自动更新',
      icon: 'wi wi-update color-gray',
      link: './index.php?c=cloud&a=upgrade&'
    }, {
      title: '更新缓存',
      icon: 'wi wi-cache color-gray',
      link: './index.php?c=system&a=updatecache&'
    }, {
      title: '',
      icon: 'divider',
    }, {
      title: '退出系统',
      icon: 'fa fa-sign-out color-gray',
      link: 'logout'
    }
  ];
  // 导航
  navs: any[] = [
    {
      title: '公众号',
      link: './index.php?c=account&a=display&'
    }, {
      title: '小程序',
      link: './index.php?c=wxapp&a=display&'
    }, {
      title: 'PC',
      link: './index.php?c=webapp&a=manage&do=list&'
    }, {
      title: '应用',
      link: './index.php?c=module&a=display&'
    }, {
      title: '系统',
      link: './index.php?c=home&a=welcome&do=system&'
    }, {
      title: '站点',
      link: './index.php?c=cloud&a=upgrade&'
    }, {
      title: '广告联盟',
      link: './index.php?c=advertisement&a=content-provider&'
    }, {
      title: '开放平台',
      link: './index.php?c=site&a=entry&do=login&m=runner_open&version_id=1.0.0&type=web'
    }, {
      title: '系统帮助',
      link: './index.php?c=help&a=display&'
    }
  ];
  constructor(
    public http: HttpClient,
    public util: UtilService
  ) { }

  activeItem: any = {
    title: '主应用',
    active: true,
    items: []
  };

  load() {
    let url = this.util.getMobileUrl('open', { open: 'getModuleInit', m: 'runner_open', name: this.util.get('m') });
    this.http.get(url).subscribe((res: any) => {
      this.plugins = res.plugins;
      this.app.title = res.title;
      this.app.image = res.image;
      this.plugins.map(plu => {
        if (plu.active) {
          this.activeItem = plu;
        }
      });
    });
  }
}
