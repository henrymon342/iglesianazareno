import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquecreemosComponent } from './enquecreemos.component';

describe('EnquecreemosComponent', () => {
  let component: EnquecreemosComponent;
  let fixture: ComponentFixture<EnquecreemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquecreemosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquecreemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
