import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditariglesiaComponent } from './editariglesia.component';

describe('EditariglesiaComponent', () => {
  let component: EditariglesiaComponent;
  let fixture: ComponentFixture<EditariglesiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditariglesiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditariglesiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
