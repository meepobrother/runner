import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  info: any;
  showKey: boolean = false;

  form: FormGroup;
  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      // 天气
      tianqi: this.fb.array([]),
      // 距离
      juli: this.fb.array([]),
      // 重量
      weight: this.fb.array([]),
      // 时间
      time: this.fb.array([]),
      // 楼层
      lou: this.fb.array([]),
      // 时长
      timeLong: this.fb.array([]),
      // 保价
      baojia: this.fb.array([])
    })
  }

  ngOnInit() {
    let info = localStorage.getItem('meepo_open_login_info');
    if (info) {
      let json = JSON.parse(info);
      this.info = json;
      console.log(this.info);
    }
  }

}
