/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoMoService } from './MoMo.service';

describe('Service: MoMo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoMoService]
    });
  });

  it('should ...', inject([MoMoService], (service: MoMoService) => {
    expect(service).toBeTruthy();
  }));
});
