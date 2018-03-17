import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'header-left',
  templateUrl: './header-left.component.html',
  styleUrls: ['./header-left.component.scss']
})
export class HeaderLeftComponent implements OnInit {
  module: string = environment.module;
  url: string;
  constructor() { }

  ngOnInit() {
    this.url = '/web/site/entry/' + this.module + '/index';
  }

}
