import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Global } from './global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl:string = Global.apiURL;

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
    console.log(this.isOpen);

  }
  constructor( private http: HttpClient, private router: Router ) { }

  login( usuario: any ){
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, usuario );
  }


  guardarToken( idToken: string ){
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());

  }


  loggedIn(){

    if( !localStorage.getItem('token') ){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if( expiraDate > new Date() ){

      console.log('EL TOKEN TODAVIA SIRVE');
      // localStorage.removeItem('token');
      return true;
    }
    else{

      console.log('EL TOKEN EXPIRO ');
      localStorage.removeItem('token')

      return false;
    }
    // return !!localStorage.getItem('token');
  }


  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }


}
