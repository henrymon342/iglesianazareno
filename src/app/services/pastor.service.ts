import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PastorService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pastores/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/pastores/all`, {headers: this.headers});
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/pastores/find/${id}`);
  }
  // create(data:any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/pastores/new`, data);
  // }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/pastores/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pastores/delete/${id}`);
  }

  getByCategory(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pastores/findByCategory`, data);
  }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByCategory( category: any ): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?category=${title}`);
  // }















}
