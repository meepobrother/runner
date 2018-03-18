import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MenuService } from '../menu.service';
@Component({
  selector: 'we7-root',
  templateUrl: './we7-root.component.html',
  styleUrls: ['./we7-root.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class We7RootComponent implements OnInit {
  constructor(
    public menu: MenuService
  ) { }

  ngOnInit() {}

  closeMsg() {
    this.menu.msg = null;
  }

}
