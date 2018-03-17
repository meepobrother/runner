import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStep1Component } from './pay-step1.component';

describe('PayStep1Component', () => {
  let component: PayStep1Component;
  let fixture: ComponentFixture<PayStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
