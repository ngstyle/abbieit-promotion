import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MinisoService {

  constructor(private http: HttpClient) { }

  findMinisoShops() {
    return this.http.get<any>(`${environment.API_URL}/miniso/store`);
  }
}
