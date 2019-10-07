import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  doLogin(cridential: any) {
    return this.http.post(`${environment.API_URL}/signin`, cridential);
  }

  doLogout() {
    this.storageService.removeIdentity();
  }

  validateToken() {
    return this.http.get(`${environment.API_URL}/validateToken`);
  }

}
