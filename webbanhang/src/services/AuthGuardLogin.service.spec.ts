/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuardLoginService } from './AuthGuardLogin.service';

describe('Service: AuthGuardLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardLoginService]
    });
  });

  it('should ...', inject([AuthGuardLoginService], (service: AuthGuardLoginService) => {
    expect(service).toBeTruthy();
  }));
});
