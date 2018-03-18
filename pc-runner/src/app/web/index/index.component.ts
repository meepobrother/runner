import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { We7Service } from '../../we7.service';
import { LoginService } from '../../login.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  activeItem: any;
  constructor(
    public we7: We7Service,
    public order: OrderService,
    public login: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  getLink(_do: string) {
    return ['/', environment.path, environment.c, environment.a, environment.module, _do];
  }

  addOrder() {
    this.router.navigate(this.getLink(this.activeItem.code));
  }

  onItem(item: any) {
    this.order.types.map(res => {
      res.active = false;
    });
    item.active = true;
    this.activeItem = item;
  }

}
