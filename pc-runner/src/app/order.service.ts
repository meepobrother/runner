import { Injectable, isDevMode } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { We7Service } from './we7.service';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/debounceTime";
import { merge } from "rxjs/operator/merge";
import { Subject } from 'rxjs/Subject';
@Injectable()
export class OrderService {
  form: FormGroup;
  myGeo: any;
  auto: any;

  types: any[] = [{
    title: '帮我买',
    id: 0,
    code: 'buy',
    active: true
  }, {
    title: '帮我送',
    id: 1,
    code: 'send',
    active: false
  }, {
    title: '帮我取',
    id: 2,
    code: 'take',
    active: false
  }, {
    title: '代排队',
    id: 3,
    code: 'takeorder',
    active: false
  }];
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
      send_type: [0],
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
      subscribe_time: [0],
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
      goods_price: [0],
      // 物品重量
      goods_weight: [0],
      // 配送工具
      goods_tool: ['不限'],
      // 物品保价
      goods_insurance: [0],
      // 报价金额
      goods_insurance_money: [0],
      // 用户登录标识
      openid: [1],
      // 开放平台id
      appid: [1],
      // 商品名字
      goods_name: [''],
      // 商品类型
      goods_type: [''],
      // 需要跑腿垫付
      goods_needpay: [0],
      // 多商品
      goods: [''],
      // 其他费用
      other_fee: [0],
      // 其他费用备注
      other_fee_desc: [''],
      // 时间戳
      timestamp: [0],
      // 字符串
      nonce_str: [],
      // 增加赏金
      addfee: [0],
      // 签名
      sign: [''],
      // 跑腿费
      freight_money: [0],
      // 需要支付金额
      need_paymoney: [0],
      // 总金额
      total_money: [0],
      // 优惠金额
      total_priceoff: [0],
      // 价格token
      price_token: ['']
    });

    this.we7.locChange.subscribe(res => {
      this.form.get('from_lat').setValue(res.lat);
      this.form.get('from_lng').setValue(res.lng);
      this.form.get('city_name').setValue(res.address.city);
      this.form.get('county_name').setValue(res.address.district);
      this.form.get('from_address').setValue(res.address.province + res.address.city + res.address.district + res.address.street + res.address.street_number);
      this.myGeo = new BMap.Geocoder();
      this.autos.map(auto => {
        auto.setLocation(res.address.city);
      });
      console.log('获取城市信息成功');
      this.form.get('to_address').valueChanges.debounceTime(300).subscribe(res => {
        console.log('正在解析结束位置：' + res);
        this.myGeo.getPoint(res, (point) => {
          if (point) {
            console.log('结束位置解析结果', point);
            this.form.get('to_lat').setValue(point.lat);
            this.form.get('to_lng').setValue(point.lng);
          } else {
            // alert("您选择地址没有解析到结果!");
          }
        }, this.form.get('city_name').value);
      });

      this.form.get('from_address').valueChanges.debounceTime(300).subscribe(res => {
        console.log('正在解析开始位置：' + res);
        this.myGeo.getPoint(res, (point) => {
          if (point) {
            console.log('开始位置解析结果', point);
            this.form.get('from_lat').setValue(point.lat);
            this.form.get('from_lng').setValue(point.lng);
          } else {
            // alert("您选择地址没有解析到结果!");
          }
        }, this.form.get('city_name').value);
      });
    });
    this.watchPriceChange(['from_lat', 'from_lng', 'to_lat', 'to_lng', 'goods_needpay', 'other_fee', 'goods_price', 'send_type', 'subscribe_time', 'subscribe_time_long', 'city_name'])
      .debounceTime(300)
      .subscribe(res => {
        this.getPrice();
      });
  }

  watchPriceChange(items: any[]) {
    let sub: Subject<any> = new Subject();
    items.map(item => {
      this.form.get(item).valueChanges.subscribe(res => {
        sub.next(res);
      });
    });
    return sub;
  }
  autos: any[] = [];
  initAuto(html: HTMLElement, callback: Function) {
    let auto = new BMap.Autocomplete({
      input: html,
      location: this.form.get('city_name').value
    })
    auto.addEventListener('onconfirm', (res: any) => {
      let { type, target, item } = res;
      let address = item.value.province + item.value.city + item.value.district + item.value.street + item.value.streetNumber + item.value.business
      callback(address, this.form);
    });
    this.autos.push(auto);
  }
  getCallbackUrl() {
    return `${location.protocol}//${location.hostname}${this.we7.getMobileUrl('open', { open: 'callback' })}`;
  }
  error_msg: string = '';
  getPrice() {
    if (isDevMode()) {
      console.log(this.form.value);
      return '';
    }
    let url = this.we7.getWebUrl('open', { open: 'getorderprice', m: 'runner_open' });
    this.http.post(url, this.form.value).subscribe((res: any) => {
      if (res.return_msg) {
        this.error_msg = res.return_msg;
        return '';
      }
      this.error_msg = '';
      this.form.get('sign').setValue(res.sign);
      this.form.get('nonce_str').setValue(res.nonce_str);
      this.form.get('distance').setValue(res.distance);
      this.form.get('freight_money').setValue(res.freight_money);
      this.form.get('goods_insurance_money').setValue(res.goods_insurancemoney);
      this.form.get('need_paymoney').setValue(res.need_paymoney);
      this.form.get('total_money').setValue(res.total_money);
      this.form.get('total_priceoff').setValue(res.total_priceoff);
      this.form.get('price_token').setValue(res.price_token);
    });
  }

  addOrder() {
    let url = this.we7.getWebUrl('open', { open: 'addorder', m: 'runner_open' });
    this.http.post(url, this.form.value).subscribe((res: any) => {
      console.log(res);
    });
  }
}
