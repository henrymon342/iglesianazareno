import { Component, Input, OnInit } from '@angular/core';
import { AdmiusuarioService } from '../../../services/admiusuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalleadmi',
  templateUrl: './detalleadmi.component.html',
  styleUrls: ['./detalleadmi.component.scss']
})
export class DetalleadmiComponent implements OnInit {

  id: any;
  public usuario: any;

  isEdit: boolean = false;

  constructor( private service_admi: AdmiusuarioService, private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    this.getAdmiByID(this.id.id);
  }


  getAdmiByID( id: number){
    this.service_admi.get(id).subscribe(res => {
      console.log(res);
      this.usuario = res;
      console.log(this.usuario.name);

    })
  }


  editarUsuario(){
    this.isEdit = !this.isEdit;
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
        this.eliminarAdmi();
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  eliminarAdmi(){
    this.service_admi.delete(this.usuario.id).subscribe(res =>{
      console.log(res);
    });
    this.router.navigateByUrl('/login/administrador/administrador')
  }
}
