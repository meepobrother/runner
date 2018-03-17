import { Injectable, isDevMode } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { We7Service } from './we7.service';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/debounceTime";

@Injectable()
export class OrderService {
  form: FormGroup;
  myGeo: any;
  auto: any;
  constructor(
    public fb: FormBuilder,
    public we7: We7Service,
    public http: HttpClient
  ) {
    this.form = this.fb.group({
      // 第三方对接平台订单id
      origin_id: [this.we7.guid()],
      // 起始地址
      from_address: [''],
      // 起始地址具体门牌号
      from_usernote: [''],
      // 起始地坐标纬度，如果无，传0(坐标系为百度地图坐标系)
      from_lat: [''],
      // 起始地坐标经度，如果无，传0(坐标系为百度地图坐标系)
      from_lng: [''],
      // 目的地址
      to_address: [''],
      // 目的地址具体门牌号
      to_usernote: [''],
      // 目的地坐标纬度，如果无，传0(坐标系为百度地图坐标系)
      to_lat: [''],
      // 目的地坐标经度，如果无，传0(坐标系为百度地图坐标系)
      to_lng: [''],
      // 订单小类 0帮我送(默认) 1帮我买 2帮我取 3 帮派队
      send_type: [3],
      // 留言
      note: [''],
      // 收件人
      receiver: [''],
      // 收件人电话
      receiver_phone: [''],
      // 发件人电话，（如果为空则是用户注册的手机号）
      pubusermobile: [''],
      // 取件是否给我打电话 1需要 0不需要
      callme_withtake: [0],
      // 特殊处理类型，是否需要保温箱 1需要 0不需要
      callback_url: [this.getCallbackUrl()],
      // 类型
      special_type: [0],
      // 预约类型 0实时订单 1预约取件时间
      subscribe_type: [0],
      // 预约时间
      subscribe_time: [],
      // 预约时长
      subscribe_time_long: [0],
      // 订单所在城市名 称(如郑州市就填”郑州市“，必须带上“市”)
      city_name: [''],
      // 订单所在县级地名称(如金水区就填“金水区”)
      county_name: [''],
      // 订单的距离
      distance: [''],
      // 优惠券ID(如果传入-1就不用优惠券否则系统自动匹配)
      coupon_id: [-1],
      // 支付方式
      countpay: ['wechat'],
      // 商品价格
      goods_price: [''],
      // 物品重量
      goods_weight: [0],
      // 配送工具
      goods_tool: [''],
      // 物品保价
      goods_insurance: ['']
    });

    this.we7.locChange.subscribe(res => {
      this.form.get('from_lat').setValue(res.lat);
      this.form.get('from_lng').setValue(res.lng);
      this.form.get('city_name').setValue(res.address.city);
      this.form.get('county_name').setValue(res.address.district);
      this.form.get('from_address').setValue(res.address.province + res.address.city + res.address.district + res.address.street + res.address.street_number);
      this.myGeo = new BMap.Geocoder();
      this.auto && this.auto.setLocation(res.address.city);
      console.log('获取城市信息成功');
      this.form.get('to_address').valueChanges.debounceTime(300).subscribe(res => {
        console.log('正在解析位置：' + res);
        this.myGeo.getPoint(res, (point) => {
          if (point) {
            console.log('解析结果', point);
            this.form.get('to_lat').setValue(point.lat);
            this.form.get('to_lng').setValue(point.lng);
          } else {
            // alert("您选择地址没有解析到结果!");
          }
        }, this.form.get('city_name').value);
      });
    });
    this.form.valueChanges.debounceTime(300).subscribe(res => {
      this.getPrice()
    });
  }

  initAuto(html: HTMLElement, callback: Function) {
    this.auto = new BMap.Autocomplete({
      input: html,
      location: this.form.get('city_name').value
    });
    this.auto.addEventListener('onconfirm', (res: any) => {
      let { type, target, item } = res;
      let address = item.value.province + item.value.city + item.value.district + item.value.street + item.value.streetNumber + item.value.business
      callback(address, this.form);
    });
  }
  getCallbackUrl() {
    return `${location.protocol}//${location.hostname}${this.we7.getMobileUrl('open', { open: 'callback' })}`;
  }

  getPrice() {
    if (isDevMode()) {
      console.log(this.form.value);
      return '';
    }
    let url = this.we7.getWebUrl('open', { open: 'getorderprice', m: 'runner_open' });
    this.http.post(url, this.form.value).subscribe(res => {
      console.log(res);
    });
  }
}
