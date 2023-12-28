import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@core/models/AuthResponse';
import { SecureLocalStorageService } from '@shared/services/securelocalstorage/secure-local-storage.service';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient, private secureStorage: SecureLocalStorageService) { }

  /**
   * Envía las credenciales de usuario para autenticación.
   * @param email El correo electrónico del usuario.
   * @param password La contraseña del usuario.
   * @returns Un Observable que emite una respuesta de autenticación.
   */
  sendCredentials(email: string, password: string): Observable<AuthResponse> {
    const body = {
      email,
      password
    };
    return this.httpClient.post<AuthResponse>(`${this.URL}/auth`, body)
      .pipe(map((response: AuthResponse) => {
        this.saveUserInfo(response);
        return response;
      }));
  }

  /**
   * Guarda de manera segura la información del usuario autenticado.
   * @param info La respuesta de autenticación que contiene los datos del usuario y el token.
   * @remarks Utiliza almacenamiento seguro para datos encriptados.
   */
  private saveUserInfo(info: AuthResponse): void {
    const { data, token } = info;
    this.secureStorage.saveEncryptedData('token', token);
    this.secureStorage.saveEncryptedData('user', data);
  }
}
