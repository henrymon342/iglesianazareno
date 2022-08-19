
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PastorService } from '../../../services/pastor.service';
import { ImagenService } from '../../../services/imagen.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crearpastor',
  templateUrl: './crearpastor.component.html',
  styleUrls: ['./crearpastor.component.scss']
})
export class CrearpastorComponent implements OnInit {

  form: FormGroup;
  formrecordAcademico: FormGroup;

  ANOS = this.range();
  AREAS = this.arrayAreas();
  // ASIGNATURAS = this.arrayAsignaturas();

  categories: string[] = ['Local', 'Distrital', 'Presbitero'];
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

    titulosForm = this.fb.group({
      diploma_ministerial: false,
      bachiller_en_teologia: false,
      licenciatura: false,
      maestria: false,
      doctorado: false
    });


  estado = false;
  pertenece: string = '';

  public isDisabled: boolean = true;

  // para las imagenes
  filesPas: File[] = [];
  filePas: File;

  tipomembresia: any = '';
  tipolugarmin: any = '';

  constructor( private fb: FormBuilder,
               private servicepastor: PastorService,
               private serviceImagen: ImagenService,
               private router: Router,
               public _location: Location ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  range() {

    var nuevo:{ ano: number }[] = [];
    for (let i = 1900; i < 2050; i++) {
      nuevo.push({ano: i});
    }
    return nuevo;
  }

  arrayAreas(){
    var areas:{ area: string, sigla: string }[] = [];
      areas.push({area: 'Pastor', sigla: 'PAS'});
      areas.push({area: 'Educación', sigla: 'EDU'});
      areas.push({area: 'Especial', sigla: 'ESP'});
      areas.push({area: 'Estudiando', sigla: 'STU'});
      areas.push({area: 'Sin asignación', sigla: 'U'});
      areas.push({area: 'Superintendente del distrito', sigla: 'DS'});
      areas.push({area: 'Jubilado con asignación', sigla: 'RA'});
      areas.push({area: 'Jubilado sin asignación', sigla: 'RU'});
      areas.push({area: 'Evangelista registrado', sigla: 'EVR'});

    return areas;
  }






  createForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      year: ['', [Validators.required]],
      area: ['', [Validators.required]],
      membresia: ['', [Validators.required]],
      lugardeministerio: ['', [Validators.required]],
      titulos: [''],
      tipomen: ['', [Validators.required]]

    })
  }



  validar(arr: any){
    console.log('category', arr.category.status);
    console.log('name', arr.name.status);
    console.log('year', arr.year.status);
    console.log('area', arr.area.status);
    console.log('membresia', arr.membresia.status);
    console.log('lugardeministerio', arr.lugardeministerio.status);
    console.log('titulos', arr.titulos.status);
    console.log('tipomen', arr.tipomen.status);

  }


  isGood(){




    if(this.form.valid){
      if( !this.form.value.year && this.form.value.area == {}  ){
        console.log('no valido ');
        this.isDisabled = true;
      }else{
        if( this.filePas == undefined ){
        console.log('No VALIDO');

        }else{
        console.log('VALIDO');
          this.isDisabled = false;
        }
      }

      // console.log('VALIDO');
      // this.isDisabled = false;


    }else{
      console.log('no valido ');
      this.isDisabled = true;

    }

    this.validar(this.form.controls)

  }


  pastorImageSelected(event: any){
    this.filesPas.push(...event.addedFiles);
    if(this.filesPas.length > 1){ // checking if files array has more than one content
    this.replaceFilePas(); // replace file
    }
    this.filePas = this.filesPas[0]
    console.log(this.filePas);
    this.isGood();


    // let reader = new FileReader();
    // reader.readAsDataURL(this.filePas)
    // reader.onloadend = () => {
    //   console.log(reader.result);
    // }
  }


  replaceFilePas(){
    this.filesPas.splice(0,1); // index =0 , remove_count = 1
  }

  alertaPastor(){

    // this.crearPastor();
    console.log(this.titulosForm.value);
    this.form.controls['titulos'].setValue(JSON.stringify(this.titulosForm.value));


    Swal.fire({
      title: 'Esta seguro de crear un nuevo pastor?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.crearPastor();

        Swal.fire('Pastor creado!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })


    if( this.isDisabled ){
      console.log(' no VALIDO');

    }else{
      console.log('VALIDO');

    }


    console.log(this.form.value);



  }

  crearPastor(){
    this.servicepastor.create(this.form.value).subscribe(async (res:any) => {

      await this.crearImagenPastor(res.id);
    });
    // this.router.navigateByUrl('/login/usuariopastores')
    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this.router.navigate([decodeURI(this._location.path())]);
      });
  }

  crearImagenPastor(id: any){
    console.log(id);

    const fd = new FormData();
    fd.append('idAsosiado',id);
    fd.append('image', this.filePas);
    this.serviceImagen.create(fd).subscribe(async (res: any) => {
      console.log(res);
    })
  }


  choose(e: any){
    console.log(e.value);
    if( e.value != 'Iglesia' ){
      this.form.controls['membresia'].setValue('');
    }
  }

  choose1(e: any){
    console.log(e.value);
    if( e.value != 'Iglesia' ){
      this.form.controls['lugardeministerio'].setValue('');
    }
  }

}
