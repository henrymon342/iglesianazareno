import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EventoModel } from '../../../models/evento.model';
import { EventosService } from '../../../services/evento.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-editaractividad',
  templateUrl: './editaractividad.component.html',
  styleUrls: ['./editaractividad.component.scss']
})
export class EditaractividadComponent implements OnInit {

  id: any;
  evento: EventoModel = new EventoModel();
  form: FormGroup;

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
  MINISTERIOS = ['JNI', 'MNI', 'DNI', 'externo'];
  MODALIDADES = ['PRESENCIAL', 'VIRTUAL'];
  LUGARES = ['Alguna iglesia', 'Otro lugar'];
  PLATAFORMAS = ['Zoom', 'Meet', 'Discord', 'Microsoft Teams', 'Otro'];
  TIPOSFECHA = ['Solo un día', 'Varios días']

  encargados: string[] = [];
  nuevo_encargado: string;

  current_modality: string;
  current_place: string;
  current_plataforma: string;
  current_plataforma_input: string;
  current_type_date: string;

  onLugar: boolean = false;
  public isDisabled: boolean = true;

  inProccess = false;
  alreadyDone = false;
  isCorrect = false;
  panelOpenState = false;

  constructor( private _snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, private service_evento:EventosService ) {
    this.createForm();
   }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params;
    console.log(this.id);
    this.getEvento(this.id.id);
    this.IGLESIAS.sort();

  }

  validarForm(){
    this.validar(this.form.controls)
    this.validarFecha();
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

  adEncargado(){
    this.encargados.push(this.nuevo_encargado);
    this.nuevo_encargado = '';
    this.form.value.encargado = this.encargados;
  }

  getEvento( id: number){
    this.service_evento.get(id).subscribe( data => {
      console.log(data);
      this.evento = data;

      let encar = data.encargado.split(',');
      console.log(encar);
      encar.forEach((element:any) => {
        this.encargados.push(element);
      });

      this.form.controls['ministerio'].setValue(data.ministerio);
      this.form.controls['titulo'].setValue(data.titulo);
      this.form.controls['modalidad'].setValue(data.modalidad);
      this.form.controls['presencial'].setValue(data.presencial);
      this.form.controls['lugar'].setValue(data.lugar);

      this.form.controls['tipofecha'].setValue(data.tipofecha);
      if(data.tipofecha == 'Solo un día'){
      this.form.controls['fecha_single'].setValue(data.fecha);

      }else{
        console.log(data.fechaini);
        console.log(data.fechafin);
        this.form.controls['fechaini'].setValue(data.fechaini);
        this.form.controls['fechafin'].setValue(data.fechafin);
      }

      this.form.controls['horaini'].setValue(this.parseDate(data.horaini));
      this.form.controls['horafin'].setValue(this.parseDate(data.horafin));

      // this.form.controls['hora'].setValue(data.hora);
      // this.form.controls['lugar'].setValue(data.lugar);
      // this.form.controls['encargado'].setValue(data.encargado);
      this.form.controls['descripcion'].setValue(data.descripcion);
    })
  }

  // getEvento(id: any) {
  //   this.service_evento.get(id).subscribe( (data: EventoModel) => {
  //     console.log(data);
  //     this.evento = data;



  //   })
  // }


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


  editarActividad(){

    this.form.controls['encargado'].setValue(this.encargados.toString());


    console.log(this.form.value);


    this.service_evento.update(this.id.id, this.form.value).subscribe( res =>{
      console.log(res);

    })
  }

  eliminarActividad(){

  }

  parseDate(input: any) {
    return new Date(input)
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


  validarFecha() {
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

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration});
  }
}

