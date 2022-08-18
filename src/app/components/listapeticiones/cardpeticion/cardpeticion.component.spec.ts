import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpeticionComponent } from './cardpeticion.component';

describe('CardpeticionComponent', () => {
  let component: CardpeticionComponent;
  let fixture: ComponentFixture<CardpeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardpeticionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardpeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
