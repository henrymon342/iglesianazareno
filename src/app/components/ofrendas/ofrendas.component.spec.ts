import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfrendasComponent } from './ofrendas.component';

describe('OfrendasComponent', () => {
  let component: OfrendasComponent;
  let fixture: ComponentFixture<OfrendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfrendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfrendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
