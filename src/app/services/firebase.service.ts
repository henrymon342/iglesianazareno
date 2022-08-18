import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from '../../environments/environment';


firebase.initializeApp(environment.firebaseConfig);


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  storageRef = firebase.app().storage().ref();

  constructor() { }


  async subirImagen( nombre: string, imgBase64: any){

    try {
      let respuesta = await this.storageRef.child("users/"+nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);

    } catch (error) {
      console.log(error);

    }

  }

}
