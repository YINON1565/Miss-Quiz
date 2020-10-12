import { TestBed } from '@angular/core/testing';

import { ConvertLayoutService } from './convert-layout.service';

describe('ConvertLayoutService', () => {
  let service: ConvertLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
