import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { EditAdminDialog } from './editadmi/editadmi.component'
import Swal from 'sweetalert2';
import { AdmiusuarioService } from '../../../services/admiusuario.service';
import { AdmiUsuarioModel } from '../../../models/admiusuario.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admiactividades',
  templateUrl: './admiactividades.component.html',
  styleUrls: ['./admiactividades.component.css']
})
export class AdmiactividadesComponent implements OnInit {


  displayedColumns: string[] = ['numero', 'nombre', 'cargo', 'ministerio', 'mas'];

  listAdministradores:AdmiUsuarioModel[] = [];

  public dataSource = new MatTableDataSource<AdmiUsuarioModel>();
  constructor( public dialog: MatDialog,
               private service_admiusers: AdmiusuarioService,
               private router: Router) {

   }

  ngOnInit(): void {
    this.getUserActivities();
    // this.dataSource = new MatTableDataSource(this.listAdministradores);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  public getUserActivities = () => {
    const tipo = { type: 'Actividades'}
    this.service_admiusers.getByType(tipo)
    .subscribe(res => {
      this.dataSource.data = res as AdmiUsuarioModel[];
    })
  }


  openDialog() {
    this.dialog.open(EditAdminDialog);
  }


  // verMas( id:number ){
  //     console.log(id);
  //     this.router.navigate(['/login/administrador/detalleadmin'], { queryParams: { id: id } });
  // }

//   emit(keyword){
//     this.emitter.emit(keyword);
// }

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

}
