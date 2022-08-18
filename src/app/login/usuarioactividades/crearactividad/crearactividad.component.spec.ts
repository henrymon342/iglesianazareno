import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearactividadComponent } from './crearactividad.component';

describe('CrearactividadComponent', () => {
  let component: CrearactividadComponent;
  let fixture: ComponentFixture<CrearactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearactividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
