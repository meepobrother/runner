import { TestBed, inject } from '@angular/core/testing';

import { We7Service } from './we7.service';

describe('We7Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [We7Service]
    });
  });

  it('should be created', inject([We7Service], (service: We7Service) => {
    expect(service).toBeTruthy();
  }));
});
