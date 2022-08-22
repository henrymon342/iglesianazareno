import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }


  getAll() {
    return this.http.get(`${this.baseUrl}/images/all`);
  }
  get(id: any): Observable<any> {
    console.log(id);

    return this.http.get(`${this.baseUrl}/images/find/${id}`);
  }
  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/images/new`, data);
  }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/images/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/images/delete/${id}`);
  }

  // getBytopicAndId(data:any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/imagenes/getBytopicAndId1|`, data);
  // }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByIdPastor( id: number ): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/images/findByIdPastor/${id}`);
  // }















}
