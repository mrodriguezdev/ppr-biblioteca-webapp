import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@core/models/Usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly URL = environment.api;

  constructor(private httpCLient: HttpClient) { }

  /**
   * Registra un nuevo usuario.
   * @param {Usuario} usuario Objeto que contiene los datos del usuario a registrar. 
   * @returns {Observable<void>} Observable que representa el resultado del registro.
   */
  registerUser(usuario: Usuario): Observable<void> {
    return this.httpCLient.post<void>(`${this.URL}/user/register`, usuario);
  }
}
