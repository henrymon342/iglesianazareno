import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/peticiones/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/peticiones/all`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/peticiones/find/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/peticiones/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/peticiones/delete/${id}`);
  }



}
