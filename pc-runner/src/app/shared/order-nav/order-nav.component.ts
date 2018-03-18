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
    link: this.getLink('buy')
  }, {
    title: '帮我送',
    icon: 'icon-song',
    link: this.getLink('send')
  }, {
    title: '帮我取',
    icon: 'icon-qu',
    link: this.getLink('take')
  }, {
    title: '代排队',
    icon: 'icon-paidui',
    link: this.getLink('takeorder')
  }];
  constructor() { }

  ngOnInit() {
  }

  getLink(_do: string) {
    return ['/', environment.path, environment.c, environment.a, environment.module, _do];
  }

}
