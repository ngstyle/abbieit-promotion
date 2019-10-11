import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { PermissionService } from './permission.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthguardService implements CanActivate {

  constructor(
    private storageService: StorageService,
    private permissionService: PermissionService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    if (! this.storageService.isAuthenticated()) {
        this.router.navigate(['signin']);
        return of(false);
    } else if (this.permissionService.isAdmin()) {
      return of(true);
    } else {
      this.router.navigate(['marchant']);
      return of(false);
    }

  }

}