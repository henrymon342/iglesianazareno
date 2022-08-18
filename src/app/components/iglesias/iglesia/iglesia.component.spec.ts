import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglesiaComponent } from './iglesia.component';

describe('IglesiaComponent', () => {
  let component: IglesiaComponent;
  let fixture: ComponentFixture<IglesiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IglesiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IglesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
