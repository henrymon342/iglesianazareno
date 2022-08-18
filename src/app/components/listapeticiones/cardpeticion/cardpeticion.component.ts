import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardpeticion',
  templateUrl: './cardpeticion.component.html',
  styleUrls: ['./cardpeticion.component.scss']
})
export class CardpeticionComponent implements OnInit {

  @Input() peticion: any;


  constructor() { }

  ngOnInit(): void {
    console.log(this.peticion);

  }

}
