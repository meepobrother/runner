import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTab2Component } from './process-tab2.component';

describe('ProcessTab2Component', () => {
  let component: ProcessTab2Component;
  let fixture: ComponentFixture<ProcessTab2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTab2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
