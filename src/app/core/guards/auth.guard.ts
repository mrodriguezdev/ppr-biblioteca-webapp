import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SecureLocalStorageService } from '@shared/services/securelocalstorage/secure-local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private secureStorage: SecureLocalStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkStorageSession();
  }


  /**
   * Verifica la presencia de un 'token' almacenado en el local storage.
   * @returns {boolean} Devuelve true si el usuario está autenticado, 
   * false en caso contrario.
   */
  checkStorageSession(): boolean {
    try {
      const token: string = this.secureStorage.getDecryptedData('token');

      if (!token) {
        this.router.navigate(['/', 'auth']);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Algo sucedió al verificar el localstorage. Error: ', err);
      return false;
    }
  }
}
