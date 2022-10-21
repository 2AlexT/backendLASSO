import { TestBed } from '@angular/core/testing';

import { RedirigirNoAutorizadoAlLoginGuard } from './redirigir-no-autorizado-al-login.guard';

describe('RedirigirNoAutorizadoAlLoginGuard', () => {
  let guard: RedirigirNoAutorizadoAlLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirigirNoAutorizadoAlLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
