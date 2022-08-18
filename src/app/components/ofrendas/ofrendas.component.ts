import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var paypal: any;


@Component({
  selector: 'app-ofrendas',
  templateUrl: './ofrendas.component.html',
  styleUrls: ['./ofrendas.component.scss']
})
export class OfrendasComponent implements OnInit {

  @ViewChild("paypal", { static: true }) paypalElement: ElementRef;

  formdata: FormGroup;
  isDisabled: boolean = true;



  constructor() { }

  ngOnInit(): void {
    paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement);
  }


  paidFor = false;
  paypalConfig = {
    //Configuration for paypal Smart Button
    createOrder: (data:any, actions:any) => {
      return actions.order.create({
        purchase_units: [
          {
            description: "Manager To Owner Payment",
            amount: {
              currency_code: "USD",
              value: 2
            }
          }
        ]
      });
    },
    onApprove: async (data: any, actions:any) => {
      const order = await actions.order.capture();
      this.paidFor = true;
      console.log(order);
    },
    onError: (err: any) => {
      console.log(err);
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


  public send(): void {
    if (this.formdata.valid) {
      console.log('formulario valido');

    }else{
      console.log('formulario no valido');
    }
  }

}
