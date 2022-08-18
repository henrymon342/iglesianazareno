import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../services/peticion.service';

@Component({
  selector: 'app-listapeticiones',
  templateUrl: './listapeticiones.component.html',
  styleUrls: ['./listapeticiones.component.scss']
})
export class ListapeticionesComponent implements OnInit {



  PETICIONES: any[] = [];


  constructor( private service_peticion: PeticionService ) { }

  ngOnInit(): void {
    this.getPetitions();
  }


  getPetitions() {
    this.service_peticion.getAll().subscribe((res: any) => {
      this.PETICIONES = res;
      console.log(res);

    })


  }

}
