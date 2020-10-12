import { TestBed } from '@angular/core/testing';

import { TreeTestService } from './tree-test.service';

describe('TreeTestService', () => {
  let service: TreeTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
