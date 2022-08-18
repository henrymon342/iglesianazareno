import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../Material/material.module';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogEventDetalle } from '../components/eventos/dialogDetalleEvento/dialogDetalleEvento';


@NgModule({
  declarations: [
    UsuarioComponent,
    LoginComponent,
    DialogEventDetalle,
  ],
  imports: [
    MaterialModule,
    LoginRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule { }
