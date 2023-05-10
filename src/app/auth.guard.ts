import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../app/services/storage.service';

@Injectable({
    providedIn: 'root'
  })

  export class AuthGuard implements CanActivate {

    constructor(private storageService: StorageService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
      const sessionData = this.storageService.getSession();
      const isLoggedIn = !!sessionData;
  
      if (isLoggedIn) {
        // El usuario tiene la sesión iniciada, redirigir a la página deseada después de iniciar sesión
        this.router.navigate(['biblioteca']);
        return false;
      }
  
      // El usuario no tiene la sesión iniciada, permitir el acceso a la ruta
      return true;
    }
  }
  
  
