import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiactividadesComponent } from './admiactividades.component';

describe('AdmiactividadesComponent', () => {
  let component: AdmiactividadesComponent;
  let fixture: ComponentFixture<AdmiactividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiactividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiactividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
