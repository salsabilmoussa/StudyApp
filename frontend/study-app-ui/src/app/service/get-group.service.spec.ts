import { TestBed } from '@angular/core/testing';

import { GetGroupService } from './get-group.service';

describe('GetGroupService', () => {
  let service: GetGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
