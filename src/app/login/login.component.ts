import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  usuario: UsuarioModel;

  errorauth = '';


  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }



  onSubmit( form: NgForm){
    this.router.navigate(['/login/administrador']);
    return;

    console.log(this.usuario);
    if( form.valid ){
      this.loginService.login( this.usuario ).subscribe( (res: any) => {
        const token = res;
        console.log(res);
        this.loginService.guardarToken(token.token);

        Swal.fire({
          title: 'Ingresando',
          position: 'bottom-start',
          // text: 'I will close in 2 seconds.',
          timer: 2000,
          didOpen: () =>{
            Swal.showLoading();
          }

        }).then(function() {
          // alert('done');
        })


        if( token.username == 'henrymon342' ){
          this.router.navigate(['/login/administrador']);
          return;
        }if( token.type == 'ACTIVIDADES' ){
          this.router.navigate(['/login/usuarioactividades']);
          return;
        }if( token.type == 'PASTORES' ){
          this.router.navigate(['/login/usuariopastores']);
          return;
        }


      },
      (error: any) =>{
        this.errorauth = error.error? error.error:'';
        console.log('oops', error.error)
      }
      )
    }

    console.log(form.valid);

    // if( this.form.value.username == 'admiusers' ){
    //   this.router.navigateByUrl('/login/administrador/administrador');
    // }

  }


  validarentrada( entrada: any ){
    return this.errorauth.includes('username')?true:false;
  }

}
