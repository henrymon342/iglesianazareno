import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrecordComponent } from './editarrecord.component';

describe('EditarrecordComponent', () => {
  let component: EditarrecordComponent;
  let fixture: ComponentFixture<EditarrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
