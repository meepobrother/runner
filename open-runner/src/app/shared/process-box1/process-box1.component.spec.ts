import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBox1Component } from './process-box1.component';

describe('ProcessBox1Component', () => {
  let component: ProcessBox1Component;
  let fixture: ComponentFixture<ProcessBox1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessBox1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBox1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
