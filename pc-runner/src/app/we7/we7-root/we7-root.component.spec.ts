import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { We7RootComponent } from './we7-root.component';

describe('We7RootComponent', () => {
  let component: We7RootComponent;
  let fixture: ComponentFixture<We7RootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ We7RootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(We7RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
