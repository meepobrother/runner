import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { We7Service } from '../../we7.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public we7: We7Service,
    public http: HttpClient,
    public router: Router
  ) {
    this.form = this.fb.group({
      email: ''
    });
  }

  ngOnInit() {
  }

  forget() {
    let url = this.we7.getWebUrl('open', { open: 'forget' });
    this.http.post(url, this.form.value).subscribe(res => {
      alert('发送成功');
      this.router.navigate(['/web/site/entry/' + environment.module + '/login']);
    });
  }

}
