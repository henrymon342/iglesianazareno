import { NgModule } from '@angular/core';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdmiactividadesComponent } from './admiactividades/admiactividades.component';
import { AdmipastoresComponent } from './admipastores/admipastores.component';
import { AdministradorComponent } from './administrador.component';
import { MaterialModule } from '../../Material/material.module';
import { CrearadminComponent } from './crearadmin/crearadmin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetalleadmiComponent } from './detalleadmi/detalleadmi.component';
import { EditAdminDialog } from './admiactividades/editadmi/editadmi.component';
import { AdmiiglesiasComponent } from './admiiglesias/admiiglesias.component';
import { CreariglesiaComponent } from './admiiglesias/creariglesia/creariglesia.component';
import { EditariglesiaComponent } from './admiiglesias/editariglesia/editariglesia.component';
import { DetalleiglesiaComponent } from './admiiglesias/detalleiglesia/detalleiglesia.component';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { MatTimepickerModule } from 'mat-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CrearactividadComponent } from './admiactividades/crearactividad/crearactividad.component';
import { DetalleactividadComponent } from './admiactividades/detalleactividad/detalleactividad.component';
import { DashboardiglesiaComponent } from './dashboardiglesia/dashboardiglesia.component';
import { DashboardusuarioComponent } from './dashboardusuario/dashboardusuario.component';


@NgModule({
  declarations: [

    AdministradorComponent,
    AdmiactividadesComponent,
    AdmipastoresComponent,
    CrearadminComponent,
    DetalleadmiComponent,
    EditAdminDialog,
    AdmiiglesiasComponent,
    CreariglesiaComponent,
    EditariglesiaComponent,
    DetalleiglesiaComponent,
    CrearactividadComponent,
    DetalleactividadComponent,
    DashboardiglesiaComponent,
    DashboardusuarioComponent

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    AdministradorRoutingModule,
    NgxDropzoneModule,
    MatTimepickerModule,
    MatNativeDateModule
  ]
})
export class AdministradorModule { }
