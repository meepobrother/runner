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
  @Input() hasLong: boolean = true;
  @Input() title: string = '排队时间';
  
  constructor(
    public fb: FormBuilder,
    public cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      subscribe_type: [0],
      subscribe_time: [],
      subscribe_time_long: [0]
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(res => {
      if (res.subscribe_type == 1) {
        this.showYue = true;
      } else {
        this.showYue = false;
      }
      this.cd.markForCheck();
      this.change.emit(this.form.value);
    });
  }

  onTimeChange(date: Date) {
    this.form.get('subscribe_time').setValue(date.getTime() / 1000);
  }

  onTimeLongChange(time: number) {
    this.form.get('subscribe_time_long').setValue(time);
  }

}
