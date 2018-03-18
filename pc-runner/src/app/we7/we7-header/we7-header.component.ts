import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
@Component({
  selector: 'we7-header',
  templateUrl: './we7-header.component.html',
  styleUrls: ['./we7-header.component.css']
})
export class We7HeaderComponent implements OnInit {
  constructor(
    public menu: MenuService
  ) { }

  ngOnInit() {
  }

  onItem(item: any) {
    if (item.link === 'logout') {

    } else {
      location.href = item.link;
    }
  }

}
