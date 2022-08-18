import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritalesComponent } from './distritales.component';

describe('DistritalesComponent', () => {
  let component: DistritalesComponent;
  let fixture: ComponentFixture<DistritalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistritalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistritalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
