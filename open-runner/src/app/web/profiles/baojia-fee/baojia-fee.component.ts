import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-baojia-fee',
  templateUrl: './baojia-fee.component.html',
  styleUrls: ['./baojia-fee.component.css']
})
export class BaojiaFeeComponent implements OnInit {
  @Input() form: FormArray;
  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.array([]);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(res => {
      console.log(res);
    });
  }

  add() {
    this.form.push(this.fb.group({
      title: '',
      price: ''
    }));
  }

}
