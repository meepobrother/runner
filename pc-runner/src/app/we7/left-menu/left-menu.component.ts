import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  constructor(
    public menu: MenuService,
    public router: Router
  ) { }

  ngOnInit() {
    this.menu.plugins.map(res => {
      if (res.active) {
        this.setItem(res);
      }
    })
  }
  setItem(item: any) {
    this.menu.plugins.map(res => {
      res.active = false;
    });
    item.active = true;
    this.menu.activeItem = item;
  }

  onMenu(item: any) {
    if (item.entry === 'menu') {
      this.router.navigate(['/', 'web', 'site', 'entry', item.module, item.do]);
    }
    if (item.entry === 'webapp') {
      this.router.navigate(['/', 'app', 'entry', 'webapp', item.module, item.do]);
    }
    if (item.entry === 'cover') {
      this.router.navigate(['/', 'app', 'entry', 'site', item.module, item.do]);
    }
  }
}
