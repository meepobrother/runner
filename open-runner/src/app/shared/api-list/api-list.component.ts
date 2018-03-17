import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {
  @Input() docs: any[] = [];
  module: string = environment.module;
  constructor() { }

  ngOnInit() {
  }

}
