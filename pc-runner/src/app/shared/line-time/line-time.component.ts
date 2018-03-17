import { Component, OnInit, ChangeDetectorRef, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'line-time',
  templateUrl: './line-time.component.html',
  styleUrls: ['./line-time.component.css']
})
export class LineTimeComponent implements OnInit {
  @Input() form: FormGroup;
  showYue: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor(
    public fb: FormBuilder,
    public cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      sendTime: [0],
      yueDate: [],
      timeLong: [0]
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(res => {
      if (res.sendTime == 1) {
        this.showYue = true;
      } else {
        this.showYue = false;
      }
      this.cd.markForCheck();
      console.log(res);
      this.change.emit(this.form.value);
    });
  }

  onTimeChange(date: Date) {
    this.form.get('yueDate').setValue(date.getTime() / 1000);
  }

  onTimeLongChange(time: number) {
    this.form.get('timeLong').setValue(time);
  }

}
