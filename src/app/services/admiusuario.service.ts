import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Global } from './global';
import { AdmiUsuarioModel } from "../models/admiusuario.model"

@Injectable({
  providedIn: 'root'
})
export class AdmiusuarioService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }




  getAll() {
    return this.http.get(`${this.baseUrl}/administrador/all`);
  }

  get(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/administrador/find/${id}`);
  }
  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/administrador/new`, data);
  }
  update(id: number, data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/administrador/update/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/administrador/delete/${id}`);
  }

  getByType(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/administrador/findActivitiesUser`, data);
  }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?title=${title}`);
  // }















}
