import { Component, OnInit, NgZone } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import { IglesiaModel } from '../../models/iglesia.model';
import { ImageModel } from '../../models/image.model';
import { IglesiaService } from '../../services/iglesia.service';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-iglesias',
  templateUrl: './iglesias.component.html',
  styleUrls: ['./iglesias.component.scss']
})
export class IglesiasComponent implements OnInit {


  slidesEx = ['first', 'second'];


  iglesias: IglesiaModel[] = [];
  image: ImageModel = new ImageModel();

  // iglesias = [
  //   {index: 1, id: 1234345, nombre: 'LA PORTADA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm' },
  //   {index: 2, id: 8965, nombre: 'WINCHESTER', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm' },
  //   {index: 3, id: 23456, nombre: 'MUNAYPATA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm' },
  //   {index: 4, id: 90856, nombre: 'CENTRAL', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm' },
  //   {index: 5, id: 343333, nombre: 'MIRAFLORES', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm' },
  //   {index: 6, id: 11111, nombre: 'VIACHA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm' },

  // ]

  slides: any;

  // slides = this.iglesias.map(
  //   (el, index) => `Slide ${this.iglesias['id']}`
  // );



  onSwiper(swiper: any ) {
    console.log(swiper);
  }



  constructor( private iglesia_service: IglesiaService, private image_service: ImagenService ) { }

  ngOnInit(): void {

    this.getIglesias();
      console.log(this.slides);
    this.slides = Array.from({ length: this.iglesias.length }).map(
      (el, index) => `Slide ${index + 1}`
    );
  }


  getIglesias() {
    this.iglesia_service.getAll().subscribe( async (res: any) =>{
      console.log(res);
      this.iglesias = await res;
    })
  }

  onSlideChange(swiper: any) {
    console.log('slide change', swiper);
    console.log(swiper[0].activeIndex);
  }

  getId( id: string){
    console.log(id);

  }


  getColor(nombre: string){
    console.log('asignar color', nombre);

    return nombre=='LA PORTADA' || nombre == 'WINCHESTER' ? '4px solid green': '4px solid red';
  }

}
