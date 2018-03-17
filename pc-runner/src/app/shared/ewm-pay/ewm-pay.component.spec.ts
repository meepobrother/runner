import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EwmPayComponent } from './ewm-pay.component';

describe('EwmPayComponent', () => {
  let component: EwmPayComponent;
  let fixture: ComponentFixture<EwmPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EwmPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EwmPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
