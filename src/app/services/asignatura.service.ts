import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/asignaturas/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/asignaturas/all`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/asignaturas/find/${id}`);
  }
  // create(data:any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/asignaturas/new`, data);
  // }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/asignaturas/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/asignaturas/delete/${id}`);
  }

  getByIdPastor(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/asignaturas/findByIdPastor`, {idFKPastor: data});
  }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByCategory( category: any ): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?category=${title}`);
  // }















}
