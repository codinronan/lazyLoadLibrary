import { TestBed } from '@angular/core/testing';

import { AsdService } from './asd.service';

describe('AsdService', () => {
  let service: AsdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
