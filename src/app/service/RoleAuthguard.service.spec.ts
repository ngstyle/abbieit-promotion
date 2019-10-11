/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleAuthguardService } from './RoleAuthguard.service';

describe('Service: RoleAuthguard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleAuthguardService]
    });
  });

  it('should ...', inject([RoleAuthguardService], (service: RoleAuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
