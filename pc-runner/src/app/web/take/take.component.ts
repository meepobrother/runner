import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.css']
})
export class TakeComponent implements OnInit {
  @ViewChild('endaddress') endaddress: ElementRef;
  @ViewChild('startaddress') startaddress: ElementRef;
  constructor(
    public order: OrderService
  ) { }

  ngOnInit() {
    this.order.form.get('send_type').setValue(2);
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
