import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorcodeComponent } from './errorcode.component';

describe('ErrorcodeComponent', () => {
  let component: ErrorcodeComponent;
  let fixture: ComponentFixture<ErrorcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
