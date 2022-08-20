import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { PeticionService } from '../../services/peticion.service';
import * as moment from 'moment';



@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  token: string|undefined;

  formdata: FormGroup;
  public siteKey: any;


  isDisabled: boolean = true;

  constructor( private fb: FormBuilder, private cdr: ChangeDetectorRef, private service_peticion: PeticionService) {
    this.token = undefined;
  }



  ngOnInit(): void {
    this.createForm();
    this.siteKey = '6LfpYpAhAAAAAL18d9TNsggqPyvV1biMbNihs5QR';
  }


  createForm(){
    this.formdata = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      ciudad: ['', Validators.required],
      peticion: ['', Validators.required],
      recaptcha: ['', Validators.required],
      fecha: [moment().toString()]

    })
  }

  public send(): void {
    if (this.formdata.valid) {
      console.log('formulario valido');
      this.formdata.controls['nombre'].setValue(this.formdata.value.nombre+' '+ this.formdata.value.apellido);
      this.service_peticion.create(this.formdata.value).subscribe(res => {
        console.log(res);

      })
    }else{
      console.log('formulario no valido');
    }
  }

  isGood(){
    this.validarForm(this.formdata.controls);
  }


  validarForm(arr: any){
    this.logColor('nombre', arr.nombre.status)
    this.logColor('apellido', arr.apellido.status)
    this.logColor('correo', arr.correo.status)
    this.logColor('ciudad', arr.ciudad.status)
    this.logColor('peticion', arr.peticion.status)
    this.logColor('recaptcha', arr.recaptcha.status)

    console.log('--------------------');
    console.log(this.formdata.valid);
    if( this.formdata.valid  ){
      this.isDisabled = false;

    }else{
      this.isDisabled = true;
    }

  }

  logColor(name: string, estado: string){
    if( estado == 'VALID' ){
    console.log(`\x1b[36m ${name} \x1b[32m ${estado}`);
    }else{
      console.log(`\x1b[36m ${name} \x1b[31m ${estado}`);
    }
  }


  handleSuccess(captchaResponse: string): void {

    if( captchaResponse != undefined ){
      console.log(captchaResponse);

        this.isDisabled = false;


    }else{
      this.isDisabled = true;
    }

  }

  verPeticiones(){

  }

}
