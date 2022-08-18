import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DniactividadComponent } from './dniactividad.component';

describe('DniactividadComponent', () => {
  let component: DniactividadComponent;
  let fixture: ComponentFixture<DniactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DniactividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DniactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
