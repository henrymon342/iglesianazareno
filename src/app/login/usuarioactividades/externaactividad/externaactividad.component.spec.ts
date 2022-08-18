import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternaactividadComponent } from './externaactividad.component';

describe('ExternaactividadComponent', () => {
  let component: ExternaactividadComponent;
  let fixture: ComponentFixture<ExternaactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternaactividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternaactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
