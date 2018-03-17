import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'uu-pay',
  templateUrl: './uu-pay.component.html',
  styleUrls: ['./uu-pay.component.css']
})
export class UuPayComponent implements OnInit {
  @Input() props: any = {};
  @Input() form: FormGroup;

  showNext: boolean = false;
  constructor(
    public fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      usermobile: [''],
      coupon_id: [-1],
      countpay: ['wechat']
    });
    
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(res=>{
      console.log(res);
    });
  }

  onNext(){
    this.showNext = true;
  }

}
