import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { We7Service } from '../../we7.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-errorcode',
  templateUrl: './errorcode.component.html',
  styleUrls: ['./errorcode.component.css']
})
export class ErrorcodeComponent implements OnInit {
  url: string;
  constructor(
    public we7: We7Service,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.url = this.we7.getMobileUrl('open', { open: '****' });
  }

}
