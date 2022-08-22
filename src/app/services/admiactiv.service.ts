import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AdmiActividadesService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }



  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admieventos/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/admieventos/all`);
  }
  // get(id): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/admieventos/find/${id}`);
  // }
  // update(id, data): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/admieventos/update/${id}`, data);
  // }
  // delete(id): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/admieventos/delete/${id}`);
  // }

  findByMinisterio(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/eventos/findByMinisterio`, data);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?title=${title}`);
  // }















}
