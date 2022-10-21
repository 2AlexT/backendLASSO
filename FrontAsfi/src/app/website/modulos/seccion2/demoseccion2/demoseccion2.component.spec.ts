import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Demoseccion2Component } from './demoseccion2.component';

describe('Demoseccion2Component', () => {
  let component: Demoseccion2Component;
  let fixture: ComponentFixture<Demoseccion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Demoseccion2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Demoseccion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
