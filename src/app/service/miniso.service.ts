import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MinisoService {

  constructor(private http: HttpClient) { }

  findAllStore() {
    return this.http.get<any>(`${environment.API_URL}/miniso/store`);
  }

  validateMobile(data: any) {
    let params = new HttpParams();
    if (data !== '') {
      params = params.set('mobileNumber', data);
    }
    return this.http.get(`${environment.API_URL}/miniso/validate`, {params});
  }

  registration(data: any) {
    return this.http.post(`${environment.API_URL}/miniso/register`, data);
  }

  use(data: any) {
    return this.http.put(`${environment.API_URL}/miniso/use`, data);
  }

  scan(data: any) {
    return this.http.post(`${environment.API_URL}/miniso/scan`, data);
  }

  minisoDashboard() {
    return this.http.get(`${environment.API_URL}/miniso/dashboard`);
  }

  findAll() {
    return this.http.get(`${environment.API_URL}/miniso`);
  }
}