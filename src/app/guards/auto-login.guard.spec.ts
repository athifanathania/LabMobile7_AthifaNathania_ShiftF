import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autoLoginGuard } from './auto-login.guard';

describe('autoLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autoLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
