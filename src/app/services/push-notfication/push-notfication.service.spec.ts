import { TestBed } from '@angular/core/testing';

import { PushNotficationService } from './push-notfication.service';

describe('PushNotficationService', () => {
  let service: PushNotficationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushNotficationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
