import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../../services/evento.service';
import { EventoModel } from '../../../models/evento.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { timer } from 'rxjs';

@Component({
  selector: 'app-detalleproevento',
  templateUrl: './detalleproevento.component.html',
  styleUrls: ['./detalleproevento.component.scss']
})
export class DetalleproeventoComponent implements OnInit {

  idTiempo: any;
  id: any;
  evento: EventoModel;
  ENCARGADOS: any[] = [];

  fecha_actual:any = '';
  hasFinished: boolean = false;

  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  source = timer(0, 1000);
  clock: any;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;

  constructor( private evento_service: EventosService, private route: ActivatedRoute ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    console.log(this.id);

    this.getEvento(this.id.id);

  }

  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }


  getEvento( id: any ) {
    this.evento_service.get(id).subscribe( res => {
      this.evento = res;
      this.ENCARGADOS = this.evento.encargado.split(',');
      console.log(res);

      var fecha_tope: any = '';
      if( this.evento.tipofecha == 'Solo un día' ){
        fecha_tope = this.evento.fecha;
        const ver_fecha = moment(fecha_tope)
        if( ver_fecha.isBefore(moment()) ){
          console.log('ESTE EVENTO YA PASO');
          this.hasFinished = true;
        }
      }else{
        fecha_tope = this.evento.fechafin;
        const ver_fecha2 = moment(fecha_tope)
        if( ver_fecha2.isBefore(moment()) ){
          console.log('ESTE EVENTO YA PASO');
          this.hasFinished = true;
        }
      }

      this.iniciarContador(fecha_tope);
    })
  }



  iniciarContador( fecha_tope: any ){
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      console.log(this.evento.fechaini);
      var localTime = moment(fecha_tope).add(1, 'days').format('YYYY-MM-DD');
      const fecha_nueva = localTime + "T04:00:00.000Z";
      this.end = new Date(fecha_nueva);
      // this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
      this.showDate();
    });
  }


  ngOnDestroy() {
    if (this.source) {
      this.clock.unsubscribe()
    }
  }

}
