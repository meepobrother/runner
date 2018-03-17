import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgintokenComponent } from './sgintoken.component';

describe('SgintokenComponent', () => {
  let component: SgintokenComponent;
  let fixture: ComponentFixture<SgintokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgintokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgintokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
