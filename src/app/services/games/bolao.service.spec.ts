import { TestBed } from '@angular/core/testing';

import { BolaoService } from './bolao.service';

describe('BolaoService', () => {
  let service: BolaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BolaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
