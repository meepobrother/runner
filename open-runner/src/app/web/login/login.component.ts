import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { We7Service } from '../../we7.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SidebarService } from '../../themes/sidebar.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  form: FormGroup;

  activeTab: any;

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
  constructor(
    public fb: FormBuilder,
    public we7: We7Service,
    public http: HttpClient,
    public router: Router,
    public sidebar: SidebarService
  ) {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

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

  login() {
    let url = this.we7.getWebUrl('open', { open: 'login' });
    this.http.post(url, this.form.value).subscribe((res: any) => {
      if (res.code === -1) {
        alert(res.msg);
      } else {
        localStorage.setItem('meepo_open_login_info', JSON.stringify(res));
        // 设置菜单
        this.sidebar.setLoginMenu();
        this.router.navigate(['/web/site/entry/' + this.module + '/home']);
      }
    });;
  }

}
