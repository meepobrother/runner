import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStep2Component } from './pay-step2.component';

describe('PayStep2Component', () => {
  let component: PayStep2Component;
  let fixture: ComponentFixture<PayStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
