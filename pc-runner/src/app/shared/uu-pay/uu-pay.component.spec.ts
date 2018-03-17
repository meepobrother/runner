import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UuPayComponent } from './uu-pay.component';

describe('UuPayComponent', () => {
  let component: UuPayComponent;
  let fixture: ComponentFixture<UuPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UuPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UuPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
