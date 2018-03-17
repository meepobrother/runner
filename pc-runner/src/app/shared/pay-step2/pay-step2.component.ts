import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'pay-step2',
  templateUrl: './pay-step2.component.html',
  styleUrls: ['./pay-step2.component.css']
})
export class PayStep2Component implements OnInit {
  @Input() props: any = {};
  @Input() form: FormGroup;
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

}
