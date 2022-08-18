import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmipastoresComponent } from './admipastores.component';

describe('AdmipastoresComponent', () => {
  let component: AdmipastoresComponent;
  let fixture: ComponentFixture<AdmipastoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmipastoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmipastoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
