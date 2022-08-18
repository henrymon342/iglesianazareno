import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapeticionesComponent } from './listapeticiones.component';

describe('ListapeticionesComponent', () => {
  let component: ListapeticionesComponent;
  let fixture: ComponentFixture<ListapeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapeticionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
