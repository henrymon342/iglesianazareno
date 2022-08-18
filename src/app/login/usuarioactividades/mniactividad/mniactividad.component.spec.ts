import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MniactividadComponent } from './mniactividad.component';

describe('MniactividadComponent', () => {
  let component: MniactividadComponent;
  let fixture: ComponentFixture<MniactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MniactividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MniactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
