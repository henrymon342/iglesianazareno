import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { EventosService } from '../../../services/evento.service';





@Component({
  selector: 'app-mniactividad',
  templateUrl: './mniactividad.component.html',
  styleUrls: ['./mniactividad.component.css']
})
export class MniactividadComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'titulo', 'fecha', 'modalidad', 'más'];

  listAdministradores: any[] = [];

  public dataSource = new MatTableDataSource<any>();

  constructor( private service_actividad: EventosService ) { }

  ngOnInit(): void {
    this.getActividadesDni();
  }


  getActividadesDni() {
    const tipo_de_ministerio = { ministerio: 'MNI'}
    this.service_actividad.findByMinisterio(tipo_de_ministerio)
    .subscribe(res => {
      console.log(res);

      this.dataSource.data = res as any[];
    })
  }


  alertaEliminar(){
    Swal.fire({
      title: 'Esta seguro de eliminar el administrador?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
