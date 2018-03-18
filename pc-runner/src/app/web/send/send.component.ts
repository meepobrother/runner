import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  @ViewChild('endaddress') endaddress: ElementRef;
  @ViewChild('startaddress') startaddress: ElementRef;
  constructor(
    public order: OrderService
  ) { }

  ngOnInit() {
    this.order.form.get('send_type').setValue(0);
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
