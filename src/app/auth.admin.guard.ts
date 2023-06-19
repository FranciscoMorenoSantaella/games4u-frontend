import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../app/services/storage.service';

@Injectable({
    providedIn: 'root'
  })

  export class AuthAdminGuard  {

    constructor(private storageService: StorageService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
      const sessionData = this.storageService.getSession();
      
  
      if (sessionData != null && sessionData.admin == true) {
        // El usuario tiene la sesión iniciada, redirigir a la página deseada después de iniciar sesión
        return true;
      }
  
      // El usuario no tiene la sesión iniciada, permitir el acceso a la ruta
      this.router.navigate(['']);
      return false;
    }
  }
  
  
