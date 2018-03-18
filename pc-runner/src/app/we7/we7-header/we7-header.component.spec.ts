import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { We7HeaderComponent } from './we7-header.component';

describe('We7HeaderComponent', () => {
  let component: We7HeaderComponent;
  let fixture: ComponentFixture<We7HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ We7HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(We7HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
