import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AypCredencialesComponent } from './ayp-credenciales.component';

describe('AypOpcionesComponent', () => {
  let component: AypCredencialesComponent;
  let fixture: ComponentFixture<AypCredencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AypCredencialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AypCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
