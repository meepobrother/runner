import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuliFeeComponent } from './juli-fee.component';

describe('JuliFeeComponent', () => {
  let component: JuliFeeComponent;
  let fixture: ComponentFixture<JuliFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuliFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuliFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
