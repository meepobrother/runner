import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTimesComponent } from './queue-times.component';

describe('QueueTimesComponent', () => {
  let component: QueueTimesComponent;
  let fixture: ComponentFixture<QueueTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
