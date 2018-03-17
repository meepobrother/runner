import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordshowComponent } from './wordshow.component';

describe('WordshowComponent', () => {
  let component: WordshowComponent;
  let fixture: ComponentFixture<WordshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
