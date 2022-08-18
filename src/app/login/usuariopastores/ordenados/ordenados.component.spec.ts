import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenadosComponent } from './ordenados.component';

describe('OrdenadosComponent', () => {
  let component: OrdenadosComponent;
  let fixture: ComponentFixture<OrdenadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
