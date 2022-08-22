import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IglesiaService {

  private baseUrl:string = Global.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor( private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/iglesias/new`, data);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/iglesias/all`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/iglesias/find/${id}`);
  }
  // create(data:any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/iglesias/new`, data);
  // }
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/iglesias/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/iglesias/delete/${id}`);
  }

  getByCategory(data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/iglesias/findByCategory`, data);
  }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  // findByCategory( category: any ): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?category=${title}`);
  // }















}
