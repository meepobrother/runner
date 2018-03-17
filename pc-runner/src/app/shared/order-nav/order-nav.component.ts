import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'order-nav',
  templateUrl: './order-nav.component.html',
  styleUrls: ['./order-nav.component.css']
})
export class OrderNavComponent implements OnInit {
  list: any[] = [{
    title: '帮我买',
    icon: 'icon-mai',
    link: ['/web/site/entry', environment.module, 'buy']
  }, {
    title: '帮我送',
    icon: 'icon-song',
    link: ['/web/site/entry', environment.module, 'send']
  }, {
    title: '帮我取',
    icon: 'icon-qu',
    link: ['/web/site/entry', environment.module, 'take']
  }, {
    title: '代排队',
    icon: 'icon-paidui',
    link: ['/web/site/entry', environment.module, 'takeorder']
  }];
  constructor() { }

  ngOnInit() {
  }

}
