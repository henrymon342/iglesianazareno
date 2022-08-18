import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreariglesiaComponent } from './creariglesia.component';

describe('CreariglesiaComponent', () => {
  let component: CreariglesiaComponent;
  let fixture: ComponentFixture<CreariglesiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreariglesiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreariglesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
