import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { PastorModel } from '../../../../models/pastor.model';
import { PastorService } from '../../../../services/pastor.service';
import { IglesiaService } from '../../../../services/iglesia.service';
import { ImagenService } from '../../../../services/imagen.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-creariglesia',
  templateUrl: './creariglesia.component.html',
  styleUrls: ['./creariglesia.component.scss']
})
export class CreariglesiaComponent implements OnInit {

  tiempoIglesia: string = '';

  startDate = new Date(1990, 0, 1);
  form: FormGroup;
  TYPEUSER: string[] = ['Actividades', 'Pastores'];
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
  ZONAS: string[] = ['CIUDAD NORTE', 'CIUDAD CENTRAL', 'CIUDAD SUR', 'MINERA', 'VIACHA', 'ZONA PACAJES', 'COMANCHE', 'TAMBO QUEMADO', 'CAQUIAVIRI', 'SUCRE']

  PASTORES: PastorModel[] = [];
  DAYS: string[] = ['SABADO', 'DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];

  typeChossed: string;
  types: string[] = ['Actividades', 'Pastores'];
  tipofundacion : string[] = ['texto', 'fecha'];

  // para las imagenes
  filesIglesias: File[] = [];
  fileIglesia: File;

  public isDisabled: boolean = true;
  public textodisabled: boolean = false;
  public fechadisabled: boolean = false;

  public pastores: PastorModel[] = [];

  // abilitar: boolean = false;

  constructor( private fb: FormBuilder,
               private service_pastor: PastorService,
               private service_iglesia: IglesiaService,
               private service_imagen: ImagenService,
               private router: Router,
               public _location: Location){
    this.createForm();
    // this.createFormFundacion();
  }

  ngOnInit(): void {
    this.getPastores();
    this.ZONAS.sort();
  }


  createForm(){
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      idPastor: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fundacion: ['', [Validators.required]],
      superdni: ['', [Validators.required]],
      presimni: ['', [Validators.required]],
      presijni: ['', [Validators.required]],
      diacentral: ['', [Validators.required]],
      horacentralini: ['', [Validators.required]],
      horacentralfin: ['', [Validators.required]],
      diajni: ['', [Validators.required]],
      horajniini: ['', [Validators.required]],
      horajnifin: ['', [Validators.required]],
      zona: ['', [Validators.required]],

    })
  }


  // createFormFundacion(){
  //   this.formfundacion = this.fb1.group({
  //     tipofundacion: new FormControl({ value: ''}),
  //     textofundacion: new FormControl({ value: '', disabled: this.textodisabled }),
  //     fechafundacion: new FormControl({ value: '', disabled: this.fechadisabled }),
  //     fundacion: ['', [Validators.required]],
  //     // fechafun: ['', [Validators.required]],
  //     // tipofundacion: ['', [Validators.required]]

  //   })
  // }

  getPastores(){
    this.service_pastor.getAll().subscribe( (res: any) => {
      console.log(res);
      this.pastores = res;
      this.pastores.sort(
        function (a, b) {
          // A va primero que B
          if (a.name < b.name)
              return -1;
          // B va primero que A
          else if (a.name > b.name)
              return 1;
          // A y B son iguales
          else
              return 0;
      }
      );

    })
  }




  validar(arr: any){
    this.logColor('nombre', arr.nombre.status)
    this.logColor('zona', arr.zona.status)
    this.logColor('idPastor', arr.idPastor.status)
    this.logColor('ubicacion', arr.ubicacion.status)
    this.logColor('fundacion', arr.fundacion.status)
    this.logColor('superdni', arr.superdni.status)
    this.logColor('presimni', arr.presimni.status)
    this.logColor('presijni', arr.presijni.status)
    this.logColor('diacentral', arr.diacentral.status)
    this.logColor('horacentralini', arr.horacentralini.status)
    this.logColor('horacentralfin', arr.horacentralfin.status)
    this.logColor('diajni', arr.diajni.status)
    this.logColor('horajniini', arr.horajniini.status)
    this.logColor('horajnifin', arr.horajnifin.status)
    if( this.fileIglesia == null){
      this.logColor('IMAGE IGLESIA', 'INVALID')
      }else{
      this.logColor('IMAGE IGLESIA', 'VALID')
      }
  }





  isGood(){
    this.calcularTiempo(this.form.value.fundacion);
    // console.log(this.form.controls);
    this.validar(this.form.controls)

    if(this.form.valid){
      if( this.fileIglesia == undefined ){
        console.log('No VALIDO');
        this.isDisabled = true;

        }else{
        console.log('VALIDO');
          this.isDisabled = false;
        }
    }
    else{
      console.log('noo valido');
      this.isDisabled = true;
    }
  }


  calcularTiempo( tiempo: any ){
    console.log(tiempo);

    this.tiempoIglesia = moment( tiempo, "YYYYMMDD").fromNow();
    return this.tiempoIglesia;
  }

  alertaIglesia(){
    this.isGood()
    if(this.isDisabled == false){
      console.log('me sirve');
      console.log(this.form.value);


    }else{
      console.log('no me serve!');

    }
      Swal.fire({
        title: 'Esta seguro de crear una nueva iglesia?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Si, lo estoy',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.crearIglesia();
          Swal.fire('Iglesia creada!', '', 'success')
        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }


  crearIglesia(){
    this.service_iglesia.create(this.form.value).subscribe(async (res:any) => {
      await this.crearImagenIglesia(res.id);
      console.log(res);

    });
    // this.router.navigateByUrl('/login/usuariopastores')
    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this.router.navigate([decodeURI(this._location.path())]);
      });
  }

  crearImagenIglesia(id: any){
    console.log(id);

    const fd = new FormData();
    fd.append('idAsosiado',id);
    fd.append('image', this.fileIglesia);
    this.service_imagen.create(fd).subscribe(async (res: any) => {
      console.log(res);
    })
  }


  iglesiaImageSelected(event: any){
    this.filesIglesias.push(...event.addedFiles);
    if(this.filesIglesias.length > 1){ // checking if files array has more than one content
    this.replaceFileIglesia(); // replace file
    }
    this.fileIglesia = this.filesIglesias[0]
    console.log(this.fileIglesia);
    this.isGood();

    let reader = new FileReader();
    reader.readAsDataURL(this.fileIglesia)
    reader.onloadend = () => {
      console.log(reader.result);

    }
  }



  //method for replacing file
  replaceFileIglesia(){
    this.filesIglesias.splice(0,1); // index =0 , remove_count = 1
  }

  // onRemove(event: any) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }


  tiempoFun(cadenaFun: string){
    return cadenaFun.split(' ')[0]+" Años";
  }

  logColor(name: string, estado: string){
    if( estado == 'VALID' ){
    console.log(`\x1b[36m ${name} \x1b[32m ${estado}`);
    }else{
      console.log(`\x1b[36m ${name} \x1b[31m ${estado}`);
    }
  }
}
