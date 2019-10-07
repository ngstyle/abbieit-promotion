import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private storageService: StorageService) { }

  hasPermission(permission: string): boolean {
    const identity = this.storageService.getIdentity();
    if (identity) {
      const permissions = identity.permissions;
      if (permissions) {
        return (',' + permissions + ',').indexOf(',' + permission + ',') !== -1;
      }
    }
    return false;
  }

}
