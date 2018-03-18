import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavWrapComponent } from './nav-wrap.component';

describe('NavWrapComponent', () => {
  let component: NavWrapComponent;
  let fixture: ComponentFixture<NavWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
