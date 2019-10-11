import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private storageService: StorageService) { }

  isAdmin(): boolean {
    const identity = this.storageService.getIdentity();
    if (identity) {
      return identity.isAdmin;
    }
    return false;
  }

}