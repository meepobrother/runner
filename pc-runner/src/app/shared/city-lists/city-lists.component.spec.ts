import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListsComponent } from './city-lists.component';

describe('CityListsComponent', () => {
  let component: CityListsComponent;
  let fixture: ComponentFixture<CityListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
