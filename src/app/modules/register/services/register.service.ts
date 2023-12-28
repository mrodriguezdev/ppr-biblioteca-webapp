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

  constructor(private httpCLient : HttpClient) { }

  registerUser(usuario: Usuario): Observable<void> {
    return this.httpCLient.post<void>(`${this.URL}/user/register`, usuario);
  }
}
