import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  @ViewChild('endaddress') endaddress: ElementRef;
  @ViewChild('startaddress') startaddress: ElementRef;

  constructor(
    public order: OrderService
  ) {

  }

  ngOnInit() {
    this.order.form.get('send_type').setValue(1);
  }

  ngAfterViewInit() {
    this.order.initAuto(this.endaddress.nativeElement, (address, form) => {
      form.get('to_address').setValue(address);
    });
    this.order.initAuto(this.startaddress.nativeElement, (address, form) => {
      form.get('from_address').setValue(address);
    });
  }

  showMore: boolean = false;
  switchMore() {
    this.showMore = !this.showMore;
  }

}
