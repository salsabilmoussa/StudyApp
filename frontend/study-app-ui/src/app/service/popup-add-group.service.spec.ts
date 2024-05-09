import { TestBed } from '@angular/core/testing';

import { PopupAddGroupService } from './popup-add-group.service';

describe('PopupAddGroupService', () => {
  let service: PopupAddGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupAddGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
