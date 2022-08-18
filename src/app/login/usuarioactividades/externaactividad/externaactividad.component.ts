import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventosService } from '../../../services/evento.service';

@Component({
  selector: 'app-externaactividad',
  templateUrl: './externaactividad.component.html',
  styleUrls: ['./externaactividad.component.scss']
})
export class ExternaactividadComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'titulo', 'fecha', 'modalidad', 'más'];

  listAdministradores: any[] = [];

  public dataSource = new MatTableDataSource<any>();

  constructor( private service_actividad: EventosService ) { }

  ngOnInit(): void {
    this.getActividadesExternos();
  }


  getActividadesExternos() {
    const tipo_de_ministerio = { ministerio: 'externo'}
    this.service_actividad.findByMinisterio(tipo_de_ministerio)
    .subscribe(res => {
      console.log(res);

      this.dataSource.data = res as any[];
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
