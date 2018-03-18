import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTipsComponent } from './system-tips.component';

describe('SystemTipsComponent', () => {
  let component: SystemTipsComponent;
  let fixture: ComponentFixture<SystemTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
