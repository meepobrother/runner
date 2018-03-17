import { Component, OnInit } from '@angular/core';
import { We7Service } from '../../we7.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-developword',
  templateUrl: './developword.component.html',
  styleUrls: ['./developword.component.css']
})
export class DevelopwordComponent implements OnInit {
  url: string;
  docs: any[] = [];
  constructor(
    public we7: We7Service,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.url = this.we7.getMobileUrl('open', { open: '****' });

    let url = this.we7.getWebUrl('open',{open: 'docs'});
    this.http.get(url).subscribe((res: any)=>{
      this.docs = res.data;
    });
  }

}
