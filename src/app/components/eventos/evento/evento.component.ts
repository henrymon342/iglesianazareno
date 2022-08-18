import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventoModel } from '../../../models/evento.model';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  @Input() evento: EventoModel;

  hasFinished: boolean = false;

  colorministerio: string = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.evento);
    this.asignarColor();

    this.verRealizado();
  }

  verRealizado(){
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
  }


  asignarColor(){
    if( this.evento.ministerio == 'JNI' ){
      return { 'background-image': "linear-gradient(0deg, rgba(255,128,0,1) 0%, rgba(255,128,0,1) 100%)" };
    }
    if( this.evento.ministerio == 'MNI' ){
      return { 'background-image': "linear-gradient(0deg, rgb(40, 161, 83) 0%,  rgb(69, 245, 131) 100%)" };
    }
    if( this.evento.ministerio == 'DNI' ){
    return { 'background-image': "linear-gradient(0deg, rgb(84, 55, 138) 0%, rgb(153, 97, 255) 100%)" };
    }
    return { 'background-image': "linear-gradient(0deg, rgb(155, 25, 51) 0%, rgb(255, 45, 87) 100%)" };
  }
}
