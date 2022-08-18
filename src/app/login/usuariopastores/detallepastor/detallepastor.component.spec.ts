import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepastorComponent } from './detallepastor.component';

describe('DetallepastorComponent', () => {
  let component: DetallepastorComponent;
  let fixture: ComponentFixture<DetallepastorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallepastorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallepastorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
