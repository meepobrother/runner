import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTimeComponent } from './line-time.component';

describe('LineTimeComponent', () => {
  let component: LineTimeComponent;
  let fixture: ComponentFixture<LineTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
