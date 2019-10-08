import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(
        private storageService: StorageService,
        private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const excludePaths: string[] = [
      '/account/',
      '/miniso/*'
    ];

    const matchedPath = excludePaths.filter(path => req.url.includes(path));

    if (matchedPath.length === 0) {
      const identity: any = this.storageService.getToken();
      if (!identity) {
        this.router.navigate(['account/signin']);
      }
      // Clone the request to add the new header.
      const authReq = req.clone({
                          setHeaders: {
                            Authorization: `Bearer ${identity}`
                          }
                      });
              // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}