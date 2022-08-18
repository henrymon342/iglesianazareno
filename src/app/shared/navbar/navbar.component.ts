import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // showNavBar = true;
  panelOpenState = false;

  constructor( private router: Router, public auth_service: LoginService ){

  }


  goToLogin(){
    // this.showNavBar = !this.showNavBar;
    this.router.navigate(['/', 'login'])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });

  }
}
