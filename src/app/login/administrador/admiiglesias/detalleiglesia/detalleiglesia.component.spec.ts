import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleiglesiaComponent } from './detalleiglesia.component';

describe('DetalleiglesiaComponent', () => {
  let component: DetalleiglesiaComponent;
  let fixture: ComponentFixture<DetalleiglesiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleiglesiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleiglesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
