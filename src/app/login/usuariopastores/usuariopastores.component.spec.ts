import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariopastoresComponent } from './usuariopastores.component';

describe('UsuariopastoresComponent', () => {
  let component: UsuariopastoresComponent;
  let fixture: ComponentFixture<UsuariopastoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariopastoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariopastoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
