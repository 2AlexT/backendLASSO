import { TestBed } from '@angular/core/testing';

import { RedirigirAutenticadoAlInicioGuard } from './redirigir-autenticado-al-inicio.guard';

describe('RedirigirAutenticadoAlInicioGuard', () => {
  let guard: RedirigirAutenticadoAlInicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirigirAutenticadoAlInicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
