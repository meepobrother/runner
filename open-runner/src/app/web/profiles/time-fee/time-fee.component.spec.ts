import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFeeComponent } from './time-fee.component';

describe('TimeFeeComponent', () => {
  let component: TimeFeeComponent;
  let fixture: ComponentFixture<TimeFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
