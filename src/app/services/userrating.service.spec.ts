import { TestBed } from '@angular/core/testing';

import { UserratingService } from './userrating.service';

describe('UserratingService', () => {
  let service: UserratingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserratingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
