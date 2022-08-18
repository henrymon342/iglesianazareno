import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleadmiComponent } from './detalleadmi.component';

describe('DetalleadmiComponent', () => {
  let component: DetalleadmiComponent;
  let fixture: ComponentFixture<DetalleadmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleadmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleadmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
