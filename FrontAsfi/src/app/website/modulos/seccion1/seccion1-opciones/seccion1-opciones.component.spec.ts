import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion1OpcionesComponent } from './seccion1-opciones.component';

describe('AypOpcionesComponent', () => {
  let component: Seccion1OpcionesComponent;
  let fixture: ComponentFixture<Seccion1OpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Seccion1OpcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seccion1OpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
