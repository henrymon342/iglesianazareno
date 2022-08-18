import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor( private auth_service: LoginService, private router: Router ){

  }

  canActivate(): boolean{
    return true;
    if( this.auth_service.loggedIn() ){
      return true;
    }


    this.router.navigate(['/login'])
    return false;
  }

}
