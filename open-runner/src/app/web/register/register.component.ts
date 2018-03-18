import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { We7Service } from '../../we7.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  module: string = environment.module;
  constructor(
    public fb: FormBuilder,
    public we7: We7Service,
    public http: HttpClient,
    public router: Router
  ) {
    this.form = this.fb.group({
      email: '',
      password: '',
      password2: ''
    });
  }

  ngOnInit() { }

  post() {
    let url = this.we7.getWebUrl('open', { open: 'register' });
    this.http.post(url, this.form.value).subscribe((res: any) => {
      if (res.code === -1) {
        alert(res.msg);
      } else {
        this.router.navigate(['/web/site/entry/' + this.module + '/login']);
      }
    });
  }

}
