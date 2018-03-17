import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
@Component({
  selector: 'take-order',
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.css']
})
export class TakeOrderComponent implements OnInit {
  form: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      lineType: [1],
      note: [''],
      startaddress: [''],
      startaddressdoor: [''],
      starttel: [''],
      sendTime: [0],
      yueDate: [],
      timeLong: [0]
    });

    this.form.valueChanges.debounceTime(300).subscribe(res => {
      this.getPrice()
    });
  }

  ngOnInit() {
  }

  getPrice() {
    console.log(this.form.value);
  }

}
