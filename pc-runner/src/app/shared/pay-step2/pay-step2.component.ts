import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'pay-step2',
  templateUrl: './pay-step2.component.html',
  styleUrls: ['./pay-step2.component.css']
})
export class PayStep2Component implements OnInit {
  @Input() props: any = {};
  @Input() form: FormGroup;
  @Output() onPay: EventEmitter<any> = new EventEmitter();
  constructor(
    public fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      coupon_id: [''],
      countpay: ['']
    });
  }

  ngOnInit() {
  }

  pay(){
    this.onPay.emit();
  }

}
