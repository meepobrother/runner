import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'pay-step1',
  templateUrl: './pay-step1.component.html',
  styleUrls: ['./pay-step1.component.css']
})
export class PayStep1Component implements OnInit {
  @Input() props: any = {};
  @Input() form: FormGroup;
  @Output() onNext: EventEmitter<any> = new EventEmitter();
  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      pubusermobile: ['']
    })
  }

  ngOnInit() {
  }

  next(){
    this.onNext.emit();
  }

}
