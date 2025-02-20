import { TestBed } from '@angular/core/testing';

import { ConfirmationsService } from './confirmations.service';

describe('ConfirmationsService', () => {
  let service: ConfirmationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
