import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {

  formSignIn: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService : AuthService, private router : Router) {}

  /**
   * Inicia el proceso de inicio de sesión.
   */
  signIn() {
    const { email, password } = this.formSignIn.value;
    this.authService.sendCredentials(email, password)
    .subscribe({
      next: () => {
        this.router.navigate(['', '/']);
      },
      error: (err) => {
        const { content } = err.error;
        console.error('Ocurrió un error al intentar iniciar sesión. Error: ', content)
      }
    });
  }
}
