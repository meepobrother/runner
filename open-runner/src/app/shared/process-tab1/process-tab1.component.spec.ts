import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTab1Component } from './process-tab1.component';

describe('ProcessTab1Component', () => {
  let component: ProcessTab1Component;
  let fixture: ComponentFixture<ProcessTab1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTab1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
