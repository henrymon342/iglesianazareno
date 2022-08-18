import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioactividadesComponent } from './usuarioactividades.component';
import { CrearactividadComponent } from './crearactividad/crearactividad.component';
import { EditaractividadComponent } from './editaractividad/editaractividad.component';
import { JniactividadComponent } from './jniactividad/jniactividad.component';
import { MniactividadComponent } from './mniactividad/mniactividad.component';
import { DniactividadComponent } from './dniactividad/dniactividad.component';
import { DetalleactividadComponent } from './detalleactividad/detalleactividad.component';
import { ExternaactividadComponent } from './externaactividad/externaactividad.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UsuarioactividadesComponent,
        canActivate: [AuthGuard] },
      { path: 'crearactividad', component: CrearactividadComponent },
      { path: '', component: JniactividadComponent },
      { path: '', component: MniactividadComponent },
      { path: '', component: DniactividadComponent },
      { path: '', component: ExternaactividadComponent },

      { path: 'editaractividad/:id', component: EditaractividadComponent },
      { path: 'detalleactividad/:id', component: DetalleactividadComponent },


      { path: '**', redirectTo: 'crearactividad' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioactividadesRoutingModule { }
