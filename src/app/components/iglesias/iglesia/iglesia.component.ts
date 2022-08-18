import { Component, Input, OnInit  } from '@angular/core';
import { ImageModel } from '../../../models/image.model';
import { ImagenService } from '../../../services/imagen.service';

@Component({
  selector: 'app-iglesia',
  templateUrl: './iglesia.component.html',
  styleUrls: ['./iglesia.component.scss']
})
export class IglesiaComponent implements OnInit {

  @Input() iglesia: any;


  public pathImage:string;
  imageIglesia: ImageModel = new ImageModel();
  imagePastor: ImageModel = new ImageModel();

  constructor( private image_service: ImagenService ) { }

  ngOnInit( ): void {

    console.log(this.iglesia);
    this.getImageChurch(this.iglesia.id);
    this.getImagePastor(this.iglesia.idPastor);
    // console.log(this.pathImage);

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

  verIglesia(){

  }

  getUrl(){

    const ur = `url(http://localhost:3000/${this.imageIglesia.imagePath})`;

    return ur;
  }

}
