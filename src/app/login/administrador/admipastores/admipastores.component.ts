import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { EditAdminDialog } from '../admiactividades/editadmi/editadmi.component'
import Swal from 'sweetalert2';
import { AdmiUsuarioModel } from '../../../models/admiusuario.model';
import { AdmiusuarioService } from '../../../services/admiusuario.service';


@Component({
  selector: 'app-admipastores',
  templateUrl: './admipastores.component.html',
  styleUrls: ['./admipastores.component.css']
})
export class AdmipastoresComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'nombre', 'cargo', 'username', 'mas'];

  listAdministradores:AdmiUsuarioModel[] = [];

  public dataSource = new MatTableDataSource<AdmiUsuarioModel>();


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( public dialog: MatDialog, private service_admiusers: AdmiusuarioService ) { }

  ngOnInit(): void {
    this.getUserPastores();
  }

  public getUserPastores = () => {
    const tipo = { type: 'Pastores'}
    this.service_admiusers.getByType(tipo)
    .subscribe(res => {
      this.dataSource.data = res as AdmiUsuarioModel[];
    })
  }


  openDialog() {
    this.dialog.open(EditAdminDialog);
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

}
