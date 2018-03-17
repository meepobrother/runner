import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBox2Component } from './process-box2.component';

describe('ProcessBox2Component', () => {
  let component: ProcessBox2Component;
  let fixture: ComponentFixture<ProcessBox2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessBox2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
