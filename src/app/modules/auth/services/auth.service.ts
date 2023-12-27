import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@core/models/AuthResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;

  constructor(private httpClient : HttpClient) { }

  sendCredentials(email: string, password: string): Observable<AuthResponse> {
    const body = {
      email, 
      password
    };
    return this.httpClient.post<AuthResponse>(`${this.URL}/auth`, body);
  }
}
