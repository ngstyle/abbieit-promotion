import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  myStorage = window.localStorage;

  constructor() { }

  setIdentity(identity: any) {
    this.myStorage.setItem('identity', JSON.stringify(identity));
  }

  removeIdentity() {
    this.myStorage.removeItem('identity');
  }

  getIdentity(): any {
    const identity: string = this.myStorage.getItem('identity');
    return JSON.parse(identity);
  }

  setUser(user: any) {
    this.myStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user: string = this.myStorage.getItem('user');
    return JSON.parse(user);
  }

  getToken(): any {
    const identity: string = this.myStorage.getItem('identity');
    if (identity) {
      const token = JSON.parse(identity).accessToken;
      if (token) {
        return token;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const identity: string = this.myStorage.getItem('identity');
    if (identity) {
      return true;
    }
    return false;
  }

  removeUser() {
    this.myStorage.removeItem('user');
  }

}
