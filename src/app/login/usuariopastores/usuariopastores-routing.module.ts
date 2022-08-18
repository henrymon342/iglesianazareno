import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalesComponent } from './locales/locales.component';
import { DistritalesComponent } from './distritales/distritales.component';
import { OrdenadosComponent } from './ordenados/ordenados.component';
import { UsuariopastoresComponent } from './usuariopastores.component';
import { DetallepastorComponent } from './detallepastor/detallepastor.component';
import { EditarpastorComponent } from './editarpastor/editarpastor.component';
import { CrearpastorComponent } from './crearpastor/crearpastor.component';
import { RecordComponent } from './distritales/record/record.component';
import { EditarrecordComponent } from './distritales/editarrecord/editarrecord.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '', component: UsuariopastoresComponent,
    canActivate: [AuthGuard] },
  { path: 'locales', component: LocalesComponent },
  { path: 'distritales', component: DistritalesComponent },
  { path: 'ordenados', component: OrdenadosComponent },
  { path: 'crearpastor', component: CrearpastorComponent },
  { path: 'editarpastor', component: EditarpastorComponent },
  { path: 'editarpastor/:id', component: EditarpastorComponent },
  { path: 'detallepastor/:id', component: DetallepastorComponent },
  { path: 'detallepastor', component: DetallepastorComponent },
  { path: 'recordpastor', component: RecordComponent },
  { path: 'recordpastor/:id', component: RecordComponent },
  { path: 'aditarrecord', component: EditarrecordComponent },
  { path: 'aditarrecord/:id', component: EditarrecordComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariopastoresRoutingModule { }
