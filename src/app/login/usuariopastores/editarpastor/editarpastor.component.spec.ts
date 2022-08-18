import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpastorComponent } from './editarpastor.component';

describe('EditarpastorComponent', () => {
  let component: EditarpastorComponent;
  let fixture: ComponentFixture<EditarpastorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpastorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpastorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
