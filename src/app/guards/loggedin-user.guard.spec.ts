import { TestBed } from '@angular/core/testing';

import { LoggedinUserGuard } from './loggedin-user.guard';

describe('LoggedinUserGuard', () => {
  let guard: LoggedinUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedinUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
