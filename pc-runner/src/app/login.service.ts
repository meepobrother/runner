import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  mobile: string;
  uid: string;
  avatar: string;
  constructor() {
    let user = sessionStorage.getItem('runner.pc.login');
    if (user) {
      let info = JSON.parse(user);
      this.login(info);
    }
  }

  login(user: any) {
    this.mobile = user.mobile;
    this.uid = user.uid;
    this.avatar = user.avatar;
    sessionStorage.setItem('runner.pc.login', JSON.stringify({
      mobile: this.mobile,
      uid: this.uid,
      avatar: this.avatar
    }));
  }

  exit() {
    this.mobile = null;
    this.uid = null;
  }
}
