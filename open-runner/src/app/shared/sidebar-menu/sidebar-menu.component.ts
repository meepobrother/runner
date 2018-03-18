import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SidebarService } from '../../themes/sidebar.service';
@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  module: string = environment.module;
  constructor(
    public sidebar: SidebarService
  ) { }

  ngOnInit() {
  }

}
