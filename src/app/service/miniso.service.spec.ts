/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MinisoService } from './miniso.service';

describe('Service: Miniso', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinisoService]
    });
  });

  it('should ...', inject([MinisoService], (service: MinisoService) => {
    expect(service).toBeTruthy();
  }));
});
