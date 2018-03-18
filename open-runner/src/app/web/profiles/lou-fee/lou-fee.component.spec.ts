import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LouFeeComponent } from './lou-fee.component';

describe('LouFeeComponent', () => {
  let component: LouFeeComponent;
  let fixture: ComponentFixture<LouFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LouFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LouFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
