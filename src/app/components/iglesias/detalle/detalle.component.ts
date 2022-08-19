import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageModel } from '../../../models/image.model';
import { IglesiaService } from '../../../services/iglesia.service';
import { ImagenService } from '../../../services/imagen.service';
import { PastorService } from '../../../services/pastor.service';
import { PastorModel } from '../../../models/pastor.model';
import { IglesiaModel } from '../../../models/iglesia.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  id: any;

  imageIglesia: ImageModel = new ImageModel();
  imagePastor: ImageModel = new ImageModel();

  pastor: PastorModel;

  iglesia: IglesiaModel;
  // iglesia = {index: 1, id: 1234345, nombre: 'LA PORTADA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', superdni: 'Hrno. Efrain Mayta', presimni: 'Hrna. Alicia Mamani', presijni: 'Hrno. Henry Miranda' };

  constructor( private route: ActivatedRoute,
               private service_Iglesia: IglesiaService,
               private image_service: ImagenService,
               private service_pastor: PastorService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params;
    console.log(this.id);

    this.getIglesia(this.id);

  }


  getIglesia(id: any){
    this.service_Iglesia.get(id.id).subscribe( async res =>{
      console.log(res);
      this.iglesia = await res;
      this.getImageChurch(id.id);
      this.getImagePastor(res.idPastor);
      this.obtenerNombrePastor(res.idPastor)
    })
  }


  getImagePastor(id: any) {
    this.image_service.get(id).subscribe(async (res: any) =>{
      this.imagePastor = await res;
      console.log(this.imagePastor);

    })
  }


  getImageChurch(id: any) {
    this.image_service.get(id).subscribe(async (res: any) =>{
      this.imageIglesia = await res;
      console.log(this.imageIglesia);

    })
  }



  getUrl(){

    const ur = `url(https://serveridn.herokuapp.com/${this.imageIglesia.imagePath})`;
    // const ur = `url(http://localhost:3000/${this.imageIglesia.imagePath})`;
  }

  obtenerNombrePastor( idpas: any ){
    this.service_pastor.get( idpas ).subscribe( async res => {
      console.log(res);
      this.pastor = await res;
    })
  }

}


