import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoModel } from '../../../models/evento.model';
import { EventosService } from '../../../services/evento.service';

@Component({
  selector: 'app-detalleactividad',
  templateUrl: './detalleactividad.component.html',
  styleUrls: ['./detalleactividad.component.scss']
})
export class DetalleactividadComponent implements OnInit {


  id: any;
  evento: EventoModel = new EventoModel();


  constructor( private route: ActivatedRoute, private service_evento: EventosService ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params;
    console.log(this.id);

    this.getEvento(this.id.id);

  }

  getEvento( id: number){
    this.service_evento.get(id).subscribe( res => {
      console.log(res);
      this.evento = res;
    })
  }

  alertaEliminar(){
    this.service_evento.delete(this.id.id).subscribe(res =>{
      console.log(res);

    })
  }

}

