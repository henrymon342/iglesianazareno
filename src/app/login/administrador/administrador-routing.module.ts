import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { AdmiactividadesComponent } from './admiactividades/admiactividades.component';
import { AdmipastoresComponent } from './admipastores/admipastores.component';
import { CrearadminComponent } from './crearadmin/crearadmin.component';
import { DetalleadmiComponent } from './detalleadmi/detalleadmi.component';
import { AdmiiglesiasComponent } from './admiiglesias/admiiglesias.component';
import { CreariglesiaComponent } from './admiiglesias/creariglesia/creariglesia.component';
import { EditariglesiaComponent } from './admiiglesias/editariglesia/editariglesia.component';
import { DetalleiglesiaComponent } from './admiiglesias/detalleiglesia/detalleiglesia.component';
import { EditAdminDialog } from './admiactividades/editadmi/editadmi.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DashboardiglesiaComponent } from './dashboardiglesia/dashboardiglesia.component';
import { DashboardusuarioComponent } from './dashboardusuario/dashboardusuario.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'administrador', component: AdministradorComponent,
        canActivate: [AuthGuard] },
      { path: 'admiactividades', component: AdmiactividadesComponent
        },
      { path: 'admipastores', component: AdmipastoresComponent
        },
      { path: 'crearadmin', component: CrearadminComponent },
      { path: 'detalleadmin', component: DetalleadmiComponent },
      { path: 'detalleadmin/:id', component: DetalleadmiComponent },
      { path: 'editaradmin/:id', component: EditAdminDialog },
      { path: 'admiiglesias', component: AdmiiglesiasComponent },
      { path: 'creariglesia', component: CreariglesiaComponent },
      { path: 'editariglesia', component: EditariglesiaComponent },
      { path: 'editariglesia/:id', component: EditariglesiaComponent },
      { path: 'detalleiglesia', component: DetalleiglesiaComponent },
      { path: 'detalleiglesia/:id', component: DetalleiglesiaComponent },
      { path: 'dashboardiglesia', component: DashboardiglesiaComponent },
      { path: 'dashboardusuario', component: DashboardusuarioComponent },

      { path: '**', redirectTo: 'administrador' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
