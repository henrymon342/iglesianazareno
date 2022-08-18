import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'administrador',
              loadChildren: () => import('../login/administrador/administrador.module').then(m => m.AdministradorModule)
      },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'usuariopastores',
              loadChildren: () => import('../login/usuariopastores/usuariopastores.module').then(m => m.UsuariopastoresModule)
      },
      { path: 'usuarioactividades',
              loadChildren: () => import('../login/usuarioactividades/usuarioactividades.module').then(m => m.UsuarioactividadesModule)
      },
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
