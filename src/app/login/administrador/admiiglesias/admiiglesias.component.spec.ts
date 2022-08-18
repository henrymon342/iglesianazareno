import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiiglesiasComponent } from './admiiglesias.component';

describe('AdmiiglesiasComponent', () => {
  let component: AdmiiglesiasComponent;
  let fixture: ComponentFixture<AdmiiglesiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmiiglesiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiiglesiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
