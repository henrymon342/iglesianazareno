import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariopastoresRoutingModule } from './usuariopastores-routing.module';
import { LocalesComponent } from './locales/locales.component';
import { DistritalesComponent } from './distritales/distritales.component';
import { OrdenadosComponent } from './ordenados/ordenados.component';
import { UsuariopastoresComponent } from './usuariopastores.component';
import { MaterialModule } from '../../Material/material.module';
import { CrearpastorComponent } from './crearpastor/crearpastor.component';
import { EditarpastorComponent } from './editarpastor/editarpastor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallepastorComponent } from './detallepastor/detallepastor.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { RecordComponent } from './distritales/record/record.component';
import { EditarrecordComponent } from './distritales/editarrecord/editarrecord.component';

@NgModule({
  declarations: [
    UsuariopastoresComponent,
    LocalesComponent,
    DistritalesComponent,
    OrdenadosComponent,
    CrearpastorComponent,
    EditarpastorComponent,
    DetallepastorComponent,
    RecordComponent,
    EditarrecordComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    UsuariopastoresRoutingModule,
    NgxDropzoneModule
  ]
})
export class UsuariopastoresModule { }
