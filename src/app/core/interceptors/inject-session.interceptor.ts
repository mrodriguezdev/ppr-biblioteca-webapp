import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecureLocalStorageService } from '@shared/services/securelocalstorage/secure-local-storage.service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private secureStorage: SecureLocalStorageService) {}

  /**
   * Interceptor encargado de adjuntar el token de autorización a las solicitudes HTTP.
   * @param request La solicitud HTTP original.
   * @param next Siguiente manejador en la cadena de interceptores.
   * @returns Observable que emite eventos HTTP, con o sin el token de autorización adjunto.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try {
      const token: string = this.secureStorage.getDecryptedData('token');

      if(!token) return next.handle(request);
      
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(newRequest);
    } catch (err) {
      console.error('Algo sucedió al interceptar la solicitud http. Error:' , err);
      return next.handle(request);
    }
  }
}
