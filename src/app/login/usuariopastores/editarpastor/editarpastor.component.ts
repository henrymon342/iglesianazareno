import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PastorModel } from '../../../models/pastor.model';
import { PastorService } from '../../../services/pastor.service';
import { AsignaturaService } from '../../../services/asignatura.service';
import { ImagenService } from '../../../services/imagen.service';
import { ImageModel } from '../../../models/image.model';


@Component({
  selector: 'app-editarpastor',
  templateUrl: './editarpastor.component.html',
  styleUrls: ['./editarpastor.component.scss']
})
export class EditarpastorComponent implements OnInit {


  hasMaterias: boolean = false;

  id: any;
  public isDisabled: boolean = true;
  public pastor: PastorModel = new PastorModel();
  form: FormGroup;

  CATEGORIES: string[] = ['Local', 'Distrital', 'Presbitero'];
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

  ANOS = this.range();
  AREAS = this.arrayAreas();

  // para las imagenes
  filesPas: File[] = [];
  filePas: File;

  tipomembresia: any;
  tipolugarmin: any;

  image: ImageModel = new ImageModel();
  listaTitulos: any[] =[];


  constructor( private fb: FormBuilder,
               private route: ActivatedRoute,
               private service_pastor: PastorService,
               private router: Router,
               private service_asignatura: AsignaturaService,
               private service_image: ImagenService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    console.log(this.id);
    this.getPastorByID(this.id.id);
    this.getImagePastor(this.id.id);
    this.getAsignaturas(this.id.id);

  }


  getImagePastor(id: number){
    this.service_image.get(id).subscribe(async (res: any) =>{
      console.log(res);
      this.image = await res;
    })
  }


  getPastorByID(id: number) {
    this.service_pastor.get(id).subscribe(data =>{
      this.pastor = data
      console.log(data);
      this.form.controls['name'].setValue(data.name);
      this.form.controls['category'].setValue(data.category);
      this.form.controls['year'].setValue(data.year);
      this.form.controls['area'].setValue(data.area);
      this.form.controls['membresia'].setValue(data.membresia);
      this.form.controls['lugardeministerio'].setValue(data.lugardeministerio);

      this.crearArrayTitulos(this.pastor.titulos);
    })
  }

  createForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      year: ['', [Validators.required]],
      area: ['', [Validators.required]],
      membresia: ['', [Validators.required]],
      tipomen: ['', [Validators.required]],
      lugardeministerio: [''],
      tipomin: ['', [Validators.required]],


    })
  }



  isGood(){

    if(this.form.valid){
      console.log('is valid!');
      this.isDisabled = false;

    }else{
      console.log('noo valid');
      this.isDisabled = true;
    }
  }

  crearArrayTitulos(titus?: string){
    console.log(titus);
    var listaaux = JSON.parse(titus+'');
    for (let variable in listaaux) {
      if (listaaux[variable] === true) {
        console.log(variable);
        this.listaTitulos.push({nombre: variable, valor: true});
      }else{
        this.listaTitulos.push({nombre: variable, valor: false});

      }
   }
    console.log(this.listaTitulos);

  }

  editarPastor(){
    this.service_pastor.update(this.id.id, this.form.value).subscribe( async res =>{
      console.log(res);

      if( this.filePas == undefined ){
        console.log('No VALIDO');

      }
      else{
        console.log('VALIDO');
        this.isDisabled = false;
        const fd = new FormData();
        fd.append('image', this.filePas);
        await this.service_image.update(this.id.id, fd).subscribe( res => {
          console.log(res);
        })
       }


      this.router.navigateByUrl('/login/usuariopastores')
    })
  }

  alertaPastor(){
    Swal.fire({
      title: 'Esta seguro de editar los datos de pastor?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.editarPastor()
        Swal.fire('Datos actualizados!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }



  getAsignaturas(id: number){
    this.service_asignatura.getByIdPastor(id).subscribe( res => {
      console.log(res);
      if( res.length == 0 ){
      console.log('no EXISTE');
      this.hasMaterias = true;
      }else{
        console.log('EXISTE');
        this.hasMaterias = false;
      }
    })
  }


  range() {

    var nuevo:{ano: string}[] = [];
    for (let i = 1900; i < 2050; i++) {
      nuevo.push({ano: i+''});
    }
    console.log(nuevo);
    return nuevo;
  }

  arrayAreas(){
    var areas: {area: string, sigla: string }[] = [];
      areas.push({area: 'Pastor', sigla: 'PAS'});
      areas.push({area: 'Educación', sigla: 'EDU'});
      areas.push({area: 'Especial', sigla: 'ESP'});
      areas.push({area: 'Estudiando', sigla: 'STU'});
      areas.push({area: 'Sin asignación', sigla: 'U'});
      areas.push({area: 'Superintendente del distrito', sigla: 'DS'});
      areas.push({area: 'Jubilado con asignación', sigla: 'RA'});
      areas.push({area: 'Jubilado sin asignación', sigla: 'RU'});
      areas.push({area: 'Evangelista registrado', sigla: 'EVR'});

    console.log(areas);
    return areas;
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

  choose(e: any){
    console.log(this.tipomembresia);
    console.log(e);

    if( this.tipomembresia != 'Iglesia' ){
      this.form.controls['membresia'].setValue('');
    }
  }

  choose1(e: any){
    console.log(this.tipolugarmin);
    console.log(e);

    if( this.tipolugarmin != 'Iglesia' ){
      this.form.controls['lugardeministerio'].setValue('');
    }
  }

}

