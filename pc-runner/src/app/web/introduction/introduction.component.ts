import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
@Component({
  selector: 'introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  list: any[] = [1, 2, 3, 4];
  activeItem: any;

  listImg = [{
    title: '帮我买',
    active: true,
    steps: [{
      title: '联系下单人',
      desc: '确认购买地点和购买要求',
      img: 'assets/images/intro-help1.png'
    }, {
      title: '前往指定地点购买',
      desc: '并索要购物小票',
      img: 'assets/images/intro-buy2.png'
    }, {
      title: '购买成功后联系收货人',
      desc: '确认收货地点和收货时间',
      img: 'assets/images/intro-buy3.png'
    }, {
      title: '前往收货地点',
      desc: '按时到达，并完成',
      img: 'assets/images/intro-buy4.png'
    }]
  }, {
    title: '帮我送',
    active: false,
    steps: [{
      title: '联系发货人',
      desc: '确认发货地点和物品规格',
      img: 'assets/images/intro-team4.png'
    }, {
      title: '前往发货地点取货',
      desc: '对物品拍照留证',
      img: 'assets/images/intro-send2.png'
    }, {
      title: '取货后联系收货人',
      desc: '确认收货地点和时间',
      img: 'assets/images/intro-send3.png'
    }, {
      title: '前往收货地点',
      desc: '按时到达，完成上门服务',
      img: 'assets/images/intro-send4.png'
    }]
  }, {
    title: '帮我取',
    active: false,
    steps: [{
      title: '联系发货人',
      desc: '确认取货地点和物品规格',
      img: 'assets/images/intro-help1.png'
    }, {
      title: '前往取货地点取货',
      desc: '对物品拍照留证',
      img: 'assets/images/intro-get2.png'
    }, {
      title: '取货后联系收货人',
      desc: '确认收货地点和收货时间',
      img: 'assets/images/intro-get3.png'
    }, {
      title: '前往收货地点',
      desc: '按时到达，完成送货',
      img: 'assets/images/intro-get4.png'
    }]
  }, {
    title: '代排队',
    active: false,
    steps: [{
      title: '联系下单人',
      desc: '确认排队地点和排队时间',
      img: 'assets/images/intro-get3.png'
    }, {
      title: '前往排队地点',
      desc: '开启计时后开始排队',
      img: 'assets/images/intro-team2.png'
    }, {
      title: '提前通知联系人',
      desc: '约定交接时间',
      img: 'assets/images/intro-team3.png'
    }, {
      title: '与联系人完成任务交接',
      desc: '排队结束',
      img: 'assets/images/intro-team4.png'
    }]
  }];
  constructor(
    public order: OrderService
  ) { }

  ngOnInit() {
    this.listImg.map(res => {
      if (res.active) {
        this.onItem(res);
      }
    });
  }

  onItem(item: any) {
    this.listImg.map(res => {
      res.active = false;
    });
    item.active = true;
    this.activeItem = item;
    console.log(this.activeItem);
  }

}
