import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {
  msg: string = '';
  module: any = {
    title: '',
    logo: ''
  };
  account: any = {
    title: '',
    logo: ''
  };
  accounts: any[] = [];
  plugins: any[] = [{
    title: '主应用',
    active: true,
    items: [],
    image: ''
  },{
    title: '插件1',
    active: false,
    items: [],
    image: ''
  }];
  constructor() { }
}
