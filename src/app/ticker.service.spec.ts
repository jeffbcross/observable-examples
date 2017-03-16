import { TestBed, inject } from '@angular/core/testing';

import { TickerService } from './ticker.service';

describe('TickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TickerService]
    });
  });

  it('should ...', inject([TickerService], (service: TickerService) => {
    expect(service).toBeTruthy();
  }));
});
