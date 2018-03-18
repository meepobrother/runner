import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SettingService } from '../setting.service';
@Component({
  selector: 'menu-root',
  templateUrl: './menu-root.component.html',
  styleUrls: ['./menu-root.component.scss']
})
export class MenuRootComponent implements OnInit {
  constructor(
    public setting: SettingService
  ) { }

  ngOnInit() {
  }
}
