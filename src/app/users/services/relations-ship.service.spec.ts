import { TestBed } from '@angular/core/testing';

import { RelationsShipService } from './relations-ship.service';

describe('RelationsShipService', () => {
  let service: RelationsShipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationsShipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
