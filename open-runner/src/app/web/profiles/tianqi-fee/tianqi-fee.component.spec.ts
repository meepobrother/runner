import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TianqiFeeComponent } from './tianqi-fee.component';

describe('TianqiFeeComponent', () => {
  let component: TianqiFeeComponent;
  let fixture: ComponentFixture<TianqiFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TianqiFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TianqiFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
