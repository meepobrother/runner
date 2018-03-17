import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopwordComponent } from './developword.component';

describe('DevelopwordComponent', () => {
  let component: DevelopwordComponent;
  let fixture: ComponentFixture<DevelopwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
