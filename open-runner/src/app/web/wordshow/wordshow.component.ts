import { Component, OnInit } from '@angular/core';
import { We7Service } from '../../we7.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-wordshow',
  templateUrl: './wordshow.component.html',
  styleUrls: ['./wordshow.component.css']
})
export class WordshowComponent implements OnInit {
  docs: any = {
    title: '',
    method: '',
    desc: '',
    code: '',
    tip: '',
    params: [],
    result: []
  };
  code: string;
  module: string = environment.module;
  constructor(
    public we7: We7Service,
    public http: HttpClient,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(res => {
      this.code = res.code;
    });
  }

  ngOnInit() {
    let url = this.we7.getWebUrl('open', { open: 'docs', code: this.code });
    this.http.get(url).subscribe((res: any) => {
      let list = res.data;
      list.map(item => {
        if (item.code === this.code) {
          this.docs = item;
        }
      });
    });
  }

}
