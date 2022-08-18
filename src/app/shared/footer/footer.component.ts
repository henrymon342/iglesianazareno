import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @HostListener('click')
  click() {
    this.loginService.toggle();
  }

  isOpen: boolean = false;

  constructor(private loginService: LoginService) { }


  ngOnInit(): void {
    console.log(this.loginService.isOpen);
    this.click()
    console.log(this.loginService.isOpen);
    this.isOpen = this.loginService.isOpen;
  }
}
