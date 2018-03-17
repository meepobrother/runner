import { Component, OnInit, isDevMode, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from '../../order.service';
@Component({
  selector: 'take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css']
})
export class TakeOrderComponent implements OnInit, AfterViewInit {

  @ViewChild('searchAddress') searchAddress: ElementRef;
  constructor(
    public order: OrderService
  ) { }
  ngOnInit() { }
  ngAfterViewInit() {
    this.order.initAuto(this.searchAddress.nativeElement, (address, form) => {
      form.get('to_address').setValue(address);
    });
  }

}
