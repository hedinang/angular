import { TestBed } from '@angular/core/testing';

import { GroupAccountService } from './group-account.service';

describe('GroupAccountService', () => {
  let service: GroupAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
