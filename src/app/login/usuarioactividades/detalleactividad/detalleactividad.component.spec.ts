import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleactividadComponent } from './detalleactividad.component';

describe('DetalleactividadComponent', () => {
  let component: DetalleactividadComponent;
  let fixture: ComponentFixture<DetalleactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleactividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
