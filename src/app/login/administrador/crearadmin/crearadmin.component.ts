import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdmiUsuarioModel } from '../../../models/admiusuario.model';
import { AdmiusuarioService } from '../../../services/admiusuario.service';
import { AdmiActividadesService } from '../../../services/admiactiv.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-crearadmin',
  templateUrl: './crearadmin.component.html',
  styleUrls: ['./crearadmin.component.scss']
})
export class CrearadminComponent implements OnInit {


  public isDisabled: boolean = true;
  administrador: AdmiUsuarioModel;

  typeChossed: string;
  TYPEUSER: string[] = ['ACTIVIDADES', 'PASTORES'];
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
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

  form: FormGroup;

  other: boolean = false;
  church: boolean = false;
  pertenece: string = '';

  select_disabled: boolean = false;
  password_wrong: boolean = false;

  hide = true;

  constructor( private fb: FormBuilder,
               private service_admiusers:AdmiusuarioService,
               private service_admiActiv: AdmiActividadesService,
               private router: Router,
               public _location: Location  ){
    this.createForm();
  }


  ngOnInit(): void {
    this.IGLESIAS.sort()
  }

  createForm(){
    this.form = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],

      iglesia: [''],
      especificacion: [''],
      pertenece: ['', [Validators.required]],
      miembroen: ['', [Validators.required]],


      ministerio: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],
      token: ['']

    })
  }


  isActivity(){
    return this.form.value.type=="ACTIVIDADES"? true: false;
  }


  isGood(){
    if( !this.isActivity() ){
      this.form.controls['ministerio'].setValue(' ');
    }
    console.log(this.pertenece);

    if( this.pertenece == 'iglesia' ){
      console.log('PERTENECE A UNA IGLESIA');
      this.form.controls['especificacion'].setValue('');
      this.select_disabled = false;
      this.form.controls['miembroen'].setValue(this.form.value.iglesia);

    }else{
      if( this.pertenece == 'otro' ){
        console.log('PERTENECE A OTRO');
        this.form.controls['iglesia'].setValue('');
        this.select_disabled = true;
        this.form.controls['miembroen'].setValue(this.form.value.especificacion);

      }
    }

    if( this.form.value.password_confirm == this.form.value.password ){
      this.password_wrong = false;
    }else{
      this.password_wrong = true;
    }


    this.validar(this.form.controls)

  }

  validar(arr: any){
    this.logColor('type', arr.type.status)
    this.logColor('ministerio', arr.ministerio.status)
    this.logColor('name', arr.name.status)
    this.logColor('lastname', arr.lastname.status)
    this.logColor('cargo', arr.cargo.status)
    this.logColor('miembroen', arr.miembroen.status)

    this.logColor('username', arr.username.status)
    this.logColor('password', arr.password.status)
    console.log('--------------------');
    console.log(this.form.valid);
    if( this.form.valid && !this.password_wrong){
      this.isDisabled = false;

    }else{
      this.isDisabled = true;
    }
  }



  alertaAdministrador(){



      Swal.fire({
        title: 'Esta seguro de crear un nuevo administrador?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Si, lo estoy',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.crearAdministrador();

          Swal.fire('Adminstrador creado!', '', 'success')
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }


    crearAdministrador(){
      console.log(this.form.value);
      this.service_admiusers.create(this.form.value).subscribe(res =>{
      console.log(res);
    })

    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this.router.navigate([decodeURI(this._location.path())]);
      });
    }

  logColor(name: string, estado: string){
    if( estado == 'VALID' ){
    console.log(`\x1b[36m ${name} \x1b[32m ${estado}`);
    }else{
      console.log(`\x1b[36m ${name} \x1b[31m ${estado}`);
    }
  }
}
