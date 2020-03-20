import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { PermissionService } from './permission.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private storageService: StorageService,
    private permissionService: PermissionService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    if (! this.storageService.isAuthenticated()) {
        this.router.navigate(['signin']);
        return of(false);
    } else {
      return of(true);
    }
  }

}