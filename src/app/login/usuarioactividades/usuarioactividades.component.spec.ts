import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioactividadesComponent } from './usuarioactividades.component';

describe('UsuarioactividadesComponent', () => {
  let component: UsuarioactividadesComponent;
  let fixture: ComponentFixture<UsuarioactividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioactividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioactividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
