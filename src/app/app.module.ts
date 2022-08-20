import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

//  MODULOS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//  RUTAS
import { ROUTES } from './app-routing.module';
import { MaterialModule } from './Material/material.module';
import { HttpClientModule } from '@angular/common/http';


//  COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { IglesiasComponent } from './components/iglesias/iglesias.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EnquecreemosComponent } from './components/enquecreemos/enquecreemos.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EventoComponent } from './components/eventos/evento/evento.component';

import { IglesiaComponent } from './components/iglesias/iglesia/iglesia.component';


import { SwiperModule } from 'swiper/angular';
import { DetalleComponent } from './components/iglesias/detalle/detalle.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DetalleproeventoComponent } from './components/eventos/detalleproevento/detalleproevento.component';
import { PeticionesComponent } from './components/peticiones/peticiones.component';
registerLocaleData(localeEs);

import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

import { ListapeticionesComponent } from './components/listapeticiones/listapeticiones.component';
import { CardpeticionComponent } from './components/listapeticiones/cardpeticion/cardpeticion.component';
import { OfrendasComponent } from './components/ofrendas/ofrendas.component';
import { NgxCaptchaModule } from 'ngx-captcha';

import { NgxPayPalModule } from 'ngx-paypal';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    IglesiasComponent,
    EventosComponent,
    EnquecreemosComponent,
    RecursosComponent,
    FooterComponent,
    EventoComponent,
    IglesiaComponent,
    DetalleComponent,
    DetalleproeventoComponent,
    PeticionesComponent,
    ListapeticionesComponent,
    CardpeticionComponent,
    OfrendasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxPayPalModule,
    RouterModule.forRoot( ROUTES ),
    SwiperModule,
    MaterialModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
