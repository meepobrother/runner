import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightFeeComponent } from './weight-fee.component';

describe('WeightFeeComponent', () => {
  let component: WeightFeeComponent;
  let fixture: ComponentFixture<WeightFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
