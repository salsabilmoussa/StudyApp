import { TestBed } from '@angular/core/testing';

import { PopupEditGroupService } from './popup-edit-group.service';

describe('PopupEditGroupService', () => {
  let service: PopupEditGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupEditGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
