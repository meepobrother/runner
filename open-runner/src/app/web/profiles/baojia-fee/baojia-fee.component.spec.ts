import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaojiaFeeComponent } from './baojia-fee.component';

describe('BaojiaFeeComponent', () => {
  let component: BaojiaFeeComponent;
  let fixture: ComponentFixture<BaojiaFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaojiaFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaojiaFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
