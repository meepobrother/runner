import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'queue-times',
  templateUrl: './queue-times.component.html',
  styleUrls: ['./queue-times.component.css']
})
export class QueueTimesComponent implements OnInit {
  form: FormGroup;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      timeDay: [0],
      timeDayTitle: [''],
      timeHour: [0],
      timeHourTitle: [''],
      timeMinute: [0],
      timeMinuteTitle: [''],
    });

    this.form.valueChanges.subscribe(res => {
      const time = res.timeDay * 24 * 60 + res.timeHour * 60 + res.timeMinute;
      this.change.emit(time);
    });
  }
  ngOnInit() {
  }
  showDay: boolean = false;
  selectDay() {
    this.showDay = true;
  }

  setDay(day) {
    this.form.get('timeDay').setValue(day);
    this.form.get('timeDayTitle').setValue(day + '天');
    this.showDay = false;
  }
  showHour: boolean = false;
  selectHour() {
    this.showHour = true;
  }

  setHour(hour) {
    this.form.get('timeHour').setValue(hour);
    this.form.get('timeHourTitle').setValue(hour + '小时');
    this.showHour = false;
  }

  showMinute = false;

  selectMinute() {
    this.showMinute = true;
  }

  setMinute(hour) {
    this.form.get('timeMinute').setValue(hour);
    this.form.get('timeMinuteTitle').setValue(hour + '分钟');
    this.showMinute = false;
  }

}
