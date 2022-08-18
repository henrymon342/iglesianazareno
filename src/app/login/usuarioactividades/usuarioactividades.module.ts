import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioactividadesRoutingModule } from './usuarioactividades-routing.module';
import { UsuarioactividadesComponent } from './usuarioactividades.component';
import { MaterialModule } from '../../Material/material.module';
import { CrearactividadComponent } from './crearactividad/crearactividad.component';
import { EditaractividadComponent } from './editaractividad/editaractividad.component';
import { JniactividadComponent } from './jniactividad/jniactividad.component';
import { MniactividadComponent } from './mniactividad/mniactividad.component';
import { DniactividadComponent } from './dniactividad/dniactividad.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


import { NgxDropzoneModule } from 'ngx-dropzone';

import { MatTimepickerModule } from 'mat-timepicker';
import { DetalleactividadComponent } from './detalleactividad/detalleactividad.component';
import { ExternaactividadComponent } from './externaactividad/externaactividad.component';

@NgModule({
  declarations: [
    UsuarioactividadesComponent,
    CrearactividadComponent,
    EditaractividadComponent,
    JniactividadComponent,
    MniactividadComponent,
    DniactividadComponent,
    DetalleactividadComponent,
    ExternaactividadComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatNativeDateModule,
    UsuarioactividadesRoutingModule,
    NgxDropzoneModule,
    MatTimepickerModule
  ]
})
export class UsuarioactividadesModule { }
