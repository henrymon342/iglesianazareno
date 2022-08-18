import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmiusuarioService } from '../../../../services/admiusuario.service';
import { AdmiActividadesService } from '../../../../services/admiactiv.service';
import { AdministradorModel } from '../../../../models/administrador';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-admi-dialog',
  templateUrl: './editadmi.component.html',
  styleUrls: ['./editadmi.component.scss']
})
export class EditAdminDialog implements OnInit{

  id: any;
  usuario: any;
  public isDisabled: boolean = true;

  public administrador: AdministradorModel = new AdministradorModel();

  TYPEUSER: string[] = ['ACTIVIDADES', 'PASTORES'];
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
  IGLESIAS: string[] = ['LA PORTADA', 'WINCHESTER', 'VIACHA'];
  form: FormGroup;

  pertence: string = '';
  select_disabled: boolean = false;
  password_wrong: boolean = false;

  hide = true;

  constructor( private route: ActivatedRoute,
               private fb: FormBuilder,
               private service_admiusers:AdmiusuarioService,
               private router: Router,
               public _location: Location){
                this.createForm();

    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params;
    this.getAdministrador(this.id.id);

  }

  ngOnInit(){



  }

  createForm(){


    this.form = this.fb.group({
      type: ['', [Validators.required]],
      ministerio: [''],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

      iglesia: [''],
      especificacion: [''],
      pertenece: [''],
      miembroen: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],

      token: ['']

    })

  }


  getAdministrador(id: any){
    this.service_admiusers.get(id).subscribe( res => {
      console.log(res);
      this.administrador = res;
      console.log(this.usuario);
      this.form = this.fb.group({
        name: [this.administrador.name, [Validators.required]],
        lastname: [this.administrador.lastname, [Validators.required]],
        type: [this.administrador.type, [Validators.required]],
        cargo: [this.administrador.cargo, [Validators.required]],
        miembroen: [this.administrador.miembroen, [Validators.required]],
        ministerio: [this.administrador.ministerio],
        username: [this.administrador.username, [Validators.required]],
        password: [this.administrador.password, [Validators.required]],
        password_confirm: [this.administrador.password, [Validators.required]],

        iglesia: [''],
        especificacion: [''],
        pertenece: [''],
        token: ['']
      })
    })
  }


  isActivity(){
    return this.form.value.type=="ACTIVIDADES"? true: false;
  }


  isGood(){
    if( !this.isActivity() ){
      this.form.controls['ministerio'].setValue(' ');
    }
    console.log(this.pertence);

    if( this.pertence == 'iglesia' ){
      console.log('PERTENECE A UNA IGLESIA');
      this.form.controls['especificacion'].setValue('');
      this.select_disabled = false;
      this.form.controls['miembroen'].setValue(this.form.value.iglesia);

    }else{
      if( this.pertence == 'otro' ){
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

  editarAdministrador(admi: any){
    console.log(admi);

    this.service_admiusers.update(this.id.id, admi).subscribe( res =>{
      console.log(res);
    })
  }

  alertaEditar(){

    this.isGood();
    Swal.fire({
      title: 'Esta seguro de editar los datos del administrador?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.editarAdministrador(this.form.value);

        this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
          console.log(decodeURI(this._location.path()));
          this.router.navigate([decodeURI(this._location.path())]);
          });

        Swal.fire('Datos actualizados!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  logColor(name: string, estado: string){
    if( estado == 'VALID' ){
    console.log(`\x1b[36m ${name} \x1b[32m ${estado}`);
    }else{
      console.log(`\x1b[36m ${name} \x1b[31m ${estado}`);
    }
  }


}
