import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }



  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/eventos/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/eventos/all`, {headers: this.headers});
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/eventos/find/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/eventos/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eventos/delete/${id}`);
  }

  findByMinisterio(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/eventos/findByMinisterio`, data);
  }

  findByMonth(data:any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.baseUrl}/eventos/findByMonth`, data);
  }

  findByRangeDates(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/eventos/findByRangeDates`, data);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?title=${title}`);
  // }















}
