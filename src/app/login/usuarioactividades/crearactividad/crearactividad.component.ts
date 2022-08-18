import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatCalendarCellClassFunction, MatDatepickerInputEvent} from '@angular/material/datepicker';

import * as moment from 'moment';
import { AdmiActividadesService } from '../../../services/admiactiv.service';
import { EventosService } from '../../../services/evento.service';

import {MatSnackBar} from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crearactividad',
  templateUrl: './crearactividad.component.html',
  styleUrls: ['./crearactividad.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CrearactividadComponent implements OnInit {

  IGLESIAS: string[] = [
    'CALLIRPA', 'CHAPICHAPINI', 'ROSAPATAYARIBAY', 'TOMATA', 'TOPOHOCO', 'TUMARAPI',// ZONA ANDINA PACAJES
    'CAQUIAVIRI', 'COLQUE ALTA', 'CHIPANAMAYA', 'LLIMPHI', 'LACALACA', 'LAURA AFETUNI', // ZONA CAQUIAVIRI
    'BAJO PANPAHASI', 'BUENOS AIRES', 'CENTRAL LA PAZ', 'EL BUEN PASTOR', 'KOINONIA', 'LA PORTADA',
    'MEMORIAL WINCHESTER', 'MIRAFLORES', 'MUNAYPATA', 'PASANKERI', 'VILLA FÁTIMA', 'ESCOBAR URIA',
    'PLAYA VERDE', 'SOPOCACHI BAJO', 'CHINCHAYA', 'CIUDADELA FERROVIARIA', // ZONA NORTE
    'ARANJUEZ', 'AVIRCATO', 'BELLA VISTA', 'CODAVISA', 'COTA COTA', '23 DE MARZO', 'MARQUIRIVI', // ZONA SUR
    'ANTARANI', 'BOTIJLACA', 'CANTUYO', 'COMANCHE', 'KELLAKELLA BAJA', 'JEKERI', 'ROSAPATA DE TULI', 'KELLAKELLA ALTA', // ZONA COMANCHE
    'CHULLUNKHAYANI', 'CONIRI', 'HILATA SAN JORGE', 'IRPUMA', 'VIACHA', 'COLQUENCHA', ' NUEVA TILATA 3',
    'TONCOPUJIO', 'MARISCAL SANTA CRUZ', // ZONA VIACHA
    'COHONI', 'TACACHÍA', 'QUILIHUAYA', // ZONA ILLIMANI
    'CALARI', 'COROCORO', 'GENERAL PANDO', 'PUTUNI', 'TUPALTUPA', 'TOTORANI', 'SICUIPATA', // ZONA MINERA
    'CALASAYA', 'CRUCERO', 'PATACAMAYA', 'CALTECA', 'CALACACHI', 'TOLOMA', // ZONA PATACAMAYA TAMBO QUEMADO
    'FE EN CRISTO', 'FILADELFIA', 'NUEVA VIDA', 'SHADDAI', 'LEUQUE', 'ALTO MUNAYPATA', 'IROCOTA'
  ];
  LUGARES = ['Alguna iglesia', 'Otro lugar'];
  PLATAFORMAS = ['Zoom', 'Meet', 'Discord', 'Microsoft Teams', 'Otro'];
  TIPOSFECHA = ['Solo un día', 'Varios días']

  current_modality: string;
  current_place: string;
  current_plataforma: string;
  current_type_date: string;
  current_plataforma_input: string;

  nuevo_encargado: string;

  public isDisabled: boolean = true;

  selected: Date | null;

  diasHabiles!: string[]

  eventsMay = { mes: 'May', dias: [1, 4]};
  eventsApr = { mes: 'Apr', dias:[7, 15]};

  dias = [];
  mes: string = '';

  encargados: string[] = [];


  inProccess = false;
  alreadyDone = false;
  isCorrect = false;
  panelOpenState = false;

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.

    console.log(cellDate);


    let mesActual = moment(cellDate).format('MMM')
    let gestionActual = moment(cellDate).format('YYYY')
    let dia = cellDate.getDate();

    console.log('Mes actual', mesActual);
    console.log('Gestion actual',gestionActual);

    return this.pintarFechaJni( gestionActual, mesActual, 'jni', dia );

    // if( mesActual == this.eventsMay.mes && gestionActual == moment(new Date()).format('YYYY') ){
    //   const date = cellDate.getDate();

    //   return this.buscarDia(date) ? 'example-custom-date-class' : '';

    // }

    // if (view === 'month') {
    //   const date = cellDate.getDate();
    //   console.log(date);
    //   // Highlight the 1st and 20th day of each month.
    //   return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    // }

    return '';
  };

  MINISTERIOS = ['JNI', 'MNI', 'DNI', 'externo'];
  MODALIDADES = ['PRESENCIAL', 'VIRTUAL'];

  form: FormGroup;

  constructor( private fb: FormBuilder, private service_evento: EventosService, private _snackBar: MatSnackBar, private router: Router,
    public _location: Location ) {

  }

   openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration});
  }

  ngOnInit(): void {
    this.createForm();
    this.diasHabiles = this.obtenerDiasHabiles();
    this.IGLESIAS.sort()
  }

  private obtenerDiasHabiles() {
    return []
    // return ['Mon', 'Tue']
  }

  pintarFechaJni( gestionactual:any , mesactual:any, ministerio:any, dia:any){

    console.log(
    this.getDates(mesactual, ministerio));

    let coleccionDias = this.getDates(mesactual, ministerio);
    if( ministerio == 'jni' ){
      if( coleccionDias.includes(dia) && gestionactual == moment(new Date()).format('YYYY') ){
        return 'jni';
        // return this.buscarDia(dia) ? 'example-custom-date-class' : '';
      }
    }
    if( ministerio == 'mni' ){
      if( coleccionDias.includes(dia) && gestionactual == moment(new Date()).format('YYYY') ){
        return 'mni';
        // return this.buscarDia(dia) ? 'example-custom-date-class' : '';
      }
    }


    return '';
  }


  getDates( mesactual:any, ministerio:any ){
    console.log('Junio', mesactual == 'Jun');
    console.log('Mayo', mesactual == 'May');

    if (mesactual == 'May'){

      return [ 1, 2, 3, 4, 5];
    }else {
      if( mesactual == 'Jun' ){
        return [ 5, 9, 10, 11, 12, 13];
      }else{
        return [];
      }
    }


  }

  dateFilter = (date: Date) => {
    // la función de filtro tomará la fecha actual del calendario
    // la convertirá a cadena de texto con formato `ddd` (solo día eje: Mon) y
    // la buscará en el arreglo `diasHabiles`
    // si existe retorna true y se habilita en el calendario
    // de lo contrario retorna false
    return this.diasHabiles?.includes(moment(date).format('ddd'))
  }

  createForm(){
    this.form = this.fb.group({
      ministerio: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      modalidad: ['', [Validators.required]],

      presencial: [''],
      virtual: [''],
      lugar: ['', [Validators.required]],

      lugar_iglesia: [''],
      lugar_otro: [''],

      tipofecha: [''],
      fecha: ['', [Validators.required]],

      encargado: [''],
      otro: [''],

      fecha_single: [''],

      fechaini: [''],
      fechafin: [''],

      horaini: ['', [Validators.required]],
      horafin: [''],


      descripcion: ['', [Validators.required]]

    })
  }


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selected = event.value;
    console.log(this.selected);

    // this.events.push(`${type}: ${event.value}`);
  }

  dateChanged(date:any) {
    console.log(`Selected: ${date}`);
    // BUSCAR ACTIVIDAD EN BASE A ESTA FECHA
  }

  crearActividad(){
    if( this.encargados ){
      this.form.controls['encargado'].setValue(this.encargados.toString());
    }

    console.log(this.form.value);

    Swal.fire({
      title: 'confirmar actividad',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service_evento.create(this.form.value).subscribe( (res) => {
          console.log(res);
        });

        this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
          console.log(decodeURI(this._location.path()));
          this.router.navigate([decodeURI(this._location.path())]);
          });
        Swal.fire('Actividad creada!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })



  }

  buscarDia(date: number) {
    return this.eventsMay.dias.includes(date);
  }


  validarForm(){
    // console.log(this.form.controls);
    this.validar(this.form.controls)
    this.validarFecha();
  }


  validarFecha() {
    console.log(this.form.value.fechaini== '');


    this.inProccess = false;
    this.alreadyDone = false;
    this.isCorrect = false;

    console.log(this.form.value.tipofecha);
    console.log(this.form.value.fechaini);
    console.log(this.form.value.fechafin);

    if( this.form.value.tipofecha == 'Varios días' ){
      console.log('VARIOS DIAS');
      const fechaver_ini = moment(this.form.value.fechaini, 'DD-MM-YYYY');
      const fechaver_fin = moment(this.form.value.fechafin, 'DD-MM-YYYY');

      var cursor_date = fechaver_ini;
      const hoy = moment().format('l');

      while( cursor_date <= fechaver_fin ){
        console.log(moment(cursor_date).format('l'));
        cursor_date = moment(cursor_date).add(1, 'days');
        if( cursor_date.format('l') == hoy ){
          this.inProccess = true;
        }

        if( fechaver_fin.isBefore(moment()) ){
          this.alreadyDone = true;
        }
        // console.log('HOY', hoy);
        // console.log('CURSOR DATE', cursor_date);

      }

      if ( this.inProccess ){
        this.openSnackBar('Fecha en proceso', 'Cerrar', 3000);
      }
      if ( this.alreadyDone ){
        this.openSnackBar('La fecha que eligio ya paso', 'Cerrar', 3000);
      }
      console.log( 'EN PROCESO', this.inProccess);
      console.log( 'YA PASO', this.alreadyDone);

    }else{
      const fecha_unica = this.form.value.fecha_single;
      const fecha_ver = moment(fecha_unica);
      const hoy = moment();
      console.log('fecha_ver', fecha_ver.format('L'));
      console.log('HOY', hoy.format('L'));

      if(  fecha_ver.format('L') == hoy.format('L') ){
        console.log('ES HOY');
        this.inProccess = true;
        this.openSnackBar('La fecha es hoy', 'Cerrar', 3000);

      }else{
        if( fecha_ver.isBefore(moment()) ){
          console.log('ESTE EVENTO YA PASO');
          this.alreadyDone = true;
          this.openSnackBar('La fecha que eligio ya paso', 'Cerrar', 3000);

        }else{
          this.isCorrect = true;
        }
      }

    }


  }

  validar(arr: any){


    if(this.current_type_date == 'Solo un día'){
      this.form.controls['fechaini'].setValue('');
      this.form.controls['fechafin'].setValue('');

      this.form.controls['fecha'].setValue(this.form.value.fecha_single);

    }else{
      if( this.current_type_date == 'Varios días' ){
        this.form.controls['fecha_single'].setValue('');

      this.form.controls['fecha'].setValue(
                                            moment(this.form.value.fechaini).subtract(10, 'days').calendar()+
                                            '_'+
                                            moment(this.form.value.fechafin).subtract(10, 'days').calendar());
      }
      if(this.form.value.fecha.includes('Invalid')){
        this.form.controls['fecha'].setValue('');
      }
    }

    if( this.current_modality == 'VIRTUAL' ){
      this.form.controls['lugar'].setValue(this.form.value.virtual);
      if( this.form.value.virtual == "Otro" ){
        this.form.controls['lugar'].setValue(this.form.value.otro);

      }
    }else{
      if( this.current_place == 'Alguna iglesia' ){
        this.form.controls['lugar'].setValue(this.form.value.lugar_iglesia);
        this.form.controls['lugar_otro'].setValue('');

      }else{
        this.form.controls['lugar'].setValue(this.form.value.lugar_otro);
        this.form.controls['lugar_iglesia'].setValue('');

      }

    }





    this.logColor('ministerio', arr.ministerio.status)
    this.logColor('titulo', arr.titulo.status)
    this.logColor('modalidad', arr.modalidad.status)
    console.log('MODALIDAD: ', this.current_modality);
    console.log('LUGAR: ', this.current_place);
    this.logColor('lugar', arr.lugar.status);
    this.logColor('encargado', arr.encargado.status)
    this.logColor('fecha', arr.fecha.status)
    this.logColor('fechaini', arr.fechaini.status)
    this.logColor('fechafin', arr.fechafin.status)
    this.logColor('horaini', arr.horaini.status)
    this.logColor('horafin', arr.horafin.status)
    this.logColor('descripcion', arr.descripcion.status)
    //estado


    console.log('el formulario es: ', this.form.valid);

    this.isDisabled = this.form.valid ? false: true;
  }

  logColor(name: string, estado: string){

    if( estado == 'VALID' ){
    console.log(`\x1b[36m ${name} \x1b[32m ${estado}`);

    }else{
      console.log(`\x1b[36m ${name} \x1b[31m ${estado}`);
    }

  }

  adEncargado(){
    if( this.nuevo_encargado == '' ){
      return;
    }
    this.encargados.push(this.nuevo_encargado);
    this.nuevo_encargado = '';
    this.form.value.encargado = this.encargados;
  }


  borrarItemEncargado( index: number){
    console.log(index);
    var arr_nuevo:any = [];
    for (let i = 0; i < this.encargados.length; i++) {

      if( i != index ){
        arr_nuevo.push(this.encargados[i])
      }
    }
    this.encargados = arr_nuevo;
    this.form.value.encargado = this.encargados;

  }
}

