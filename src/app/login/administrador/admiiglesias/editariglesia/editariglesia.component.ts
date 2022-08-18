import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IglesiaModel } from '../../../../models/iglesia.model';
import { ImageModel } from '../../../../models/image.model';
import { IglesiaService } from '../../../../services/iglesia.service';
import { ImagenService } from '../../../../services/imagen.service';

import { DatePipe } from '@angular/common';
import { PastorService } from '../../../../services/pastor.service';
import { PastorModel } from '../../../../models/pastor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editariglesia',
  templateUrl: './editariglesia.component.html',
  styleUrls: ['./editariglesia.component.scss']
})

export class EditariglesiaComponent implements OnInit {


  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;


  id: any;
  iglesia: IglesiaModel = new IglesiaModel();
  image: ImageModel = new ImageModel();
  public isDisabled: boolean = true;
  startDate = new Date(1990, 0, 1);
  form: FormGroup;
  TYPEUSER: string[] = ['Actividades', 'Pastores'];
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
  DAYS: string[] = ['SABADO', 'DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  PASTORES: any[] = [
    { nombre: 'ISAI', id:1 },
    { nombre: 'RENE', id:2 },
    { nombre: 'JAVIER', id:3 },
    { nombre: 'uriel', id:4 },
    { nombre: 'DANIEL', id:5 },
    { nombre: 'ISantosSAI', id:6 }
  ];

  // para las imagenes
  filesIglesias: File[] = [];
  fileIglesia: File;

  // pastores
  public pastores: PastorModel[] = [];

  selectedValue: any;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private service_iglesia: IglesiaService,
               private fb: FormBuilder,
               private service_image: ImagenService,
               private service_pastor: PastorService
               ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    console.log(this.id);
    this.getIglesia(this.id.id);
    this.getImageIglesia(this.id.id);
  }



  getImageIglesia(id: number){
    this.service_image.get(id).subscribe(async (res: any) =>{
      console.log(res);
      this.image = await res;
    })
  }

  getIglesia(id: any) {



    // this.datePipe.transform(myDate, 'yyyy-MM-dd'); //whatever format you need.

      this.service_iglesia.get(id).subscribe(data =>{
        this.iglesia = data
        console.log(data);
        this.form.controls['nombre'].setValue(data.nombre);

        this.getPastores(data.idPastor);



        this.form.controls['ubicacion'].setValue(data.ubicacion);
        this.form.controls['fundacion'].setValue(data.fundacion);
        this.form.controls['superdni'].setValue(data.superdni);
        this.form.controls['presimni'].setValue(data.presimni);
        this.form.controls['presijni'].setValue(data.presijni);
        this.form.controls['diacentral'].setValue(data.diacentral);
        this.form.controls['horacentralini'].setValue(this.parseDate(data.horacentralini));
        this.form.controls['horacentralfin'].setValue(this.parseDate(data.horacentralfin));
        this.form.controls['diajni'].setValue(data.diajni);

        var today = this.parseDate(data.horajniini);
        this.form.controls['horajniini'].setValue(this.parseDate(data.horajniini));
        this.form.controls['horajnifin'].setValue(this.parseDate(data.horajnifin));
      })

  }


  parseDate(input: any) {
    return new Date(input)
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
      horajnifin: ['', [Validators.required]]

    })
  }


  alertaIglesia(){

    Swal.fire({
      title: 'Esta seguro de editar los datos de Iglesia?',
      showDenyButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.editarIglesia()

        Swal.fire('Datos actualizados!', '', 'success')
      } else if (result.isDenied) {
      }
    })
    console.log( this.form.value );

  }


  editarIglesia(){
    this.service_iglesia.update(this.id.id, this.form.value).subscribe( async res =>{
      console.log( await res);

      if( this.fileIglesia == undefined ){
        console.log('NO EXISTE IMAGEN PARA EDITAR');
      }
      else{
        const fd = new FormData();
        fd.append('image', this.fileIglesia);
        await this.service_image.update(this.id.id, fd).subscribe( res => {
          console.log(res);
        console.log('IMAGEN EDITADA');

        })
       }


      this.router.navigateByUrl('/login/administrador')
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

  }

  //method for replacing file
  replaceFileIglesia(){
    this.filesIglesias.splice(0,1); // index =0 , remove_count = 1
  }

  cambioselect(e: any){
    console.log(e.value);
    this.isGood();
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


  getPastores(idpas:any ): any {
    this.service_pastor.getAll().subscribe( async (res: any) => {
      console.log(res);
      this.pastores = res;
      // this.pastores.sort(
      //   function (a, b) {
      //     // A va primero que B
      //     if (a.name < b.name)
      //         return -1;
      //     // B va primero que A
      //     else if (a.name > b.name)
      //         return 1;
      //     // A y B son iguales
      //     else
      //         return 0;
      // });
      this.pastores.forEach((pas: PastorModel) =>{
            console.log(idpas);
            console.log(pas.id);

            if( pas.id == idpas ){
              console.log('hay coincidencia');

              this.form.controls['idPastor'].setValue(pas.id);
            }
          })
    });





  }

}
