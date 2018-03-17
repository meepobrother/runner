import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.css']
})
export class TimeSelectComponent implements OnInit {

  form: FormGroup;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor(
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      timeDay: [],
      timeDayTitle: [''],
      timeHour: [],
      timeHourTitle: [''],
      timeMinute: [],
      timeMinuteTitle: [''],
    });

    this.form.valueChanges.subscribe(res => {
      res.timeDay = res.timeDay || this.formatDate(new Date());
      res.timeHour = res.timeHour || 0;
      res.timeMinute = res.timeMinute || 0;
      const time = new Date(res.timeDay.year, res.timeDay.month, res.timeDay.day, res.timeHour, res.timeMinute);
      this.change.emit(time);
    })
  }
  ngOnInit() {
    this.getWeekDay();
  }
  weeks: any[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  getWeekDay() {
    let now = new Date();
    let formatNow = this.formatDate(now);
    let days: any[] = [];
    for (let i = 0; i < 7; i++) {
      let formatDate = this.formatDate(new Date(
        formatNow.year,
        formatNow.month - 1,
        formatNow.day + i,
      ));
      days.push({
        title: (formatDate.week < formatNow.week && formatDate.week !== 0) ? '下' + this.weeks[formatDate.week] : this.weeks[formatDate.week],
        value: {
          year: formatDate.year,
          month: formatDate.month,
          day: formatDate.day
        }
      });
    }
    this.dayList = days;
  }

  formatDate(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hore: date.getHours(),
      minute: date.getMinutes(),
      week: date.getDay()
    }
  }

  dayList: any[] = [];
  hourList: any[] = [];
  minuteList: any[] = [];

  showDay: boolean = false;
  selectDay() {
    this.showDay = true;
  }

  setDay(day) {
    this.form.get('timeDay').setValue(day.value);
    this.form.get('timeDayTitle').setValue(day.title);
    this.showDay = false;
  }
  showHour: boolean = false;
  selectHour() {
    this.showHour = true;
  }

  setHour(hour) {
    this.form.get('timeHour').setValue(hour);
    this.form.get('timeHourTitle').setValue(hour + '点');
    this.showHour = false;
  }

  showMinute = false;

  selectMinute() {
    this.showMinute = true;
  }

  setMinute(hour) {
    this.form.get('timeMinute').setValue(hour);
    this.form.get('timeMinuteTitle').setValue(hour + '分');
    this.showMinute = false;
  }

}
