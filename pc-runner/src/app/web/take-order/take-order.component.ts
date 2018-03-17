import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import {} from '../../';
@Component({
  selector: 'take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css']
})
export class TakeOrderComponent implements OnInit {
  form: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      // 第三方对接平台订单id
      origin_id: [''],
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
      // 小类别
      send_type: [1],
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
      callback_url: [''],
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
      countpay: ['wechat']
    });

    this.form.valueChanges.debounceTime(300).subscribe(res => {
      this.getPrice()
    });
  }

  ngOnInit() {
  }

  getPrice() {
    console.log(this.form.value);
    let url = this.we7.
  }

}
