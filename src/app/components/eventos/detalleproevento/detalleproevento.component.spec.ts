import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleproeventoComponent } from './detalleproevento.component';

describe('DetalleproeventoComponent', () => {
  let component: DetalleproeventoComponent;
  let fixture: ComponentFixture<DetalleproeventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleproeventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleproeventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
