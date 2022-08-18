import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpastorComponent } from './crearpastor.component';

describe('CrearpastorComponent', () => {
  let component: CrearpastorComponent;
  let fixture: ComponentFixture<CrearpastorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearpastorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpastorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
