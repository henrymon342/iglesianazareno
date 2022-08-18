import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JniactividadComponent } from './jniactividad.component';

describe('JniactividadComponent', () => {
  let component: JniactividadComponent;
  let fixture: ComponentFixture<JniactividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JniactividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JniactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
