import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressListsComponent } from './address-lists.component';

describe('AddressListsComponent', () => {
  let component: AddressListsComponent;
  let fixture: ComponentFixture<AddressListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
