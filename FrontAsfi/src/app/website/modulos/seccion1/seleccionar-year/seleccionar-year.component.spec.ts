import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarYearComponent } from './seleccionar-year.component';

describe('SeleccionarYearComponent', () => {
  let component: SeleccionarYearComponent;
  let fixture: ComponentFixture<SeleccionarYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
