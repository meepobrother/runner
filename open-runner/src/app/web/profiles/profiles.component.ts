import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  info: any;
  showKey: boolean = false;
  constructor() { }

  ngOnInit() {
    let info = localStorage.getItem('meepo_open_login_info');
    if (info) {
      let json = JSON.parse(info);
      this.info = json;
      console.log(this.info);
    }
  }

}
