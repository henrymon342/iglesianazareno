import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IglesiaService } from '../../../../services/iglesia.service';
import { IglesiaModel } from '../../../../models/iglesia.model';
import { ImagenService } from '../../../../services/imagen.service';
import Swal from 'sweetalert2';
import { ImageModel } from '../../../../models/image.model';
import { PastorService } from '../../../../services/pastor.service';


export interface PeriodicElement {
  position: number;
  name: string;

}


@Component({
  selector: 'app-detalleiglesia',
  templateUrl: './detalleiglesia.component.html',
  styleUrls: ['./detalleiglesia.component.scss']
})
export class DetalleiglesiaComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name'];

  id: any;
  iglesia: IglesiaModel = new IglesiaModel();

  image: ImageModel = new ImageModel();
  ruta_imagen: string = '';

  nombrePastor: string = '';

  constructor( private route: ActivatedRoute,
               private service_iglesia: IglesiaService,
               private service_pastor: PastorService,
               private service_imagen: ImagenService,
               private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    console.log(this.id);
    this.getIglesia(this.id);
    this.getImagenIglesia(this.id);
    if(this.ruta_imagen){
      console.log('existe');
      this.ruta_imagen = 'http://localhost:3000/'+ this.image.imagePath;
    }else{
      console.log('no existe');
      this.ruta_imagen = '/assets/imagenes/joven.jpg';
    }

    // this.image.imagePath = this.image.imagePath ? 'http://localhost:3000/'+ this.image.imagePath: '/assets/imagenes/joven.jpg';
  }


  getIglesia(id: any) {
    this.service_iglesia.get(id.id).subscribe(async res => {
      console.log(res);
      this.iglesia = await res;
      this.getPastor(this.iglesia.idPastor);
    })
  }


  getPastor(id: string) {
    console.log(id);

    this.service_pastor.get(id).subscribe( res =>{
      this.nombrePastor = res['name'];
      console.log(res);

    })
  }


  getImagenIglesia(id: any){
    this.service_imagen.get(id.id).subscribe(async (res: any) =>{
      console.log(res);
      this.image =  res;
    })
  }

  eliminarIglesia(){
    const id = this.id.id;
    this.service_iglesia.delete(id).subscribe(async (respas: any) => {
      let imp: any = [];
      const resimag = await this.service_imagen.delete(id).subscribe( response => {
        return response;
      })
      imp.push(respas);
      imp.push(resimag)
      // console.log(respas);
      this.router.navigateByUrl('/login/administrador/administrador')
    })
  }

  alertaEliminar(){
    Swal.fire({
      title: 'Esta seguro de eliminar la iglesia?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarIglesia();
        Swal.fire('Eliminada!', '', 'success')
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }



}

