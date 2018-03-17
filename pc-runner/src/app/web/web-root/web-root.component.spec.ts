import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRootComponent } from './web-root.component';

describe('WebRootComponent', () => {
  let component: WebRootComponent;
  let fixture: ComponentFixture<WebRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
