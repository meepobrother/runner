import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelongFeeComponent } from './timelong-fee.component';

describe('TimelongFeeComponent', () => {
  let component: TimelongFeeComponent;
  let fixture: ComponentFixture<TimelongFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelongFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelongFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
