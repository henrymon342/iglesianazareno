import { Routes  } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { IglesiasComponent } from './components/iglesias/iglesias.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EnquecreemosComponent } from './components/enquecreemos/enquecreemos.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IglesiaComponent } from './components/iglesias/iglesia/iglesia.component';
import { DetalleComponent } from './components/iglesias/detalle/detalle.component';
import { DialogEventDetalle } from './components/eventos/dialogDetalleEvento/dialogDetalleEvento';
import { EventoComponent } from './components/eventos/evento/evento.component';
import { DetalleproeventoComponent } from './components/eventos/detalleproevento/detalleproevento.component';
import { PeticionesComponent } from './components/peticiones/peticiones.component';
import { ListapeticionesComponent } from './components/listapeticiones/listapeticiones.component';
import { CardpeticionComponent } from './components/listapeticiones/cardpeticion/cardpeticion.component';
import { OfrendasComponent } from './components/ofrendas/ofrendas.component';


export const ROUTES: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'iglesias', component: IglesiasComponent },
  { path: 'ministerios',
    loadChildren: () => import('./components/ministerios/ministerios.module').then(m => m.MinisteriosModule)
  },
  { path: 'eventos', component: EventosComponent },
  { path: 'evento/:id', component: EventoComponent },
  { path: 'detalleproevento/:id', component: DetalleproeventoComponent },
  { path: 'dialogeventos', component: DialogEventDetalle },
  { path: 'enquecreemos', component: EnquecreemosComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'peticiones', component: PeticionesComponent },
  { path: 'listapeticiones', component: ListapeticionesComponent },
  { path: 'cardpeticion', component: CardpeticionComponent },
  { path: 'ofrendas', component: OfrendasComponent,
     },
  { path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)

  },
  { path: 'iglesia/:id', component: IglesiaComponent },
  { path: 'detalle/:id', component: DetalleComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },

]
